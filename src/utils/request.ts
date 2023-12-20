import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface IRequest<T, P> {
  uri: string;
  method: string;
  data?: T;
  params?: P;
}

// response 형태, 이는 백엔드의 상황을 보고 변경
interface IResponse<R> {
  timestamp: string;
  isSuccess: boolean;
  code: string;
  message: string;
  data: R;
}

/**
 * request
 * @template T - request body type
 * @template R - response body type
 * @template P - request parameter type
 *
 * @param {string} uri - server endpoint
 * @param {string} method - get, post, patch, put, delete
 * @param {T} data - data type
 * @param {P} params - request parameter
 */

async function request<T, R, P>({ uri, method, data, params }: IRequest<T, P>) {
  const config: AxiosRequestConfig = {
    url: uri,
    method,
    data,
    params,
  };

  const response = await axiosInstance<T, AxiosResponse<IResponse<R>>>(config);
  return response.data;
}

export default request;
