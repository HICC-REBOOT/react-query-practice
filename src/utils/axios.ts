/* eslint-disable no-param-reassign */
import axios, { AxiosError } from 'axios';
import BASE_URL from '@/config';

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

  const token = localStorage.getItem('access_token');

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
    const axiosError = getAxiosError(error as AxiosError);
    alert(axiosError?.message);
    return Promise.reject(error);
  },
);
