import axios, { AxiosError } from 'axios';
import BASE_URL from '../config';
import reissue from './reissue';
import { removeCookie } from './cookie';

// error 형태, 이는 백엔드의 상황을 보고 변경
export interface IError {
  timestamp: string;
  isSuccess: boolean;
  code: string;
  message: string;
  httpStatus: number;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  if (!config.headers) {
    return config;
  }

  const token = localStorage.getItem('access');

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;

const getAxiosError = (error: AxiosError): IError | undefined => {
  const serverError = error as AxiosError<IError>;
  return serverError.response?.data;
};

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config } = error;
    const axiosError = getAxiosError(error as AxiosError);
    console.log(axiosError);

    if (axiosError?.code === 'non_login') {
      alert('로그인이 필요한 서비스입니다.');
      return Promise.reject(error);
    }

    if (axiosError?.code === 'access_expired') {
      const originRequest = config;
      const newAccess = await reissue();
      originRequest.headers.Authorization = `Bearer ${newAccess}`;

      return axiosInstance(originRequest);
    }

    if (axiosError?.code === 'refresh_expired') {
      removeCookie('refresh');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
