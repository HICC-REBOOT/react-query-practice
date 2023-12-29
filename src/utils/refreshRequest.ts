import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import BASE_URL from '@/config';

interface IRequest<T, P> {
  uri: string;
  method: 'get' | 'post' | 'patch' | 'delete' | 'put';
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

const refreshInstance = axios.create({
  baseURL: BASE_URL,
});

/**
 * refreshRequest (리프레시 요청 외 사용금지)
 * @template T - request body type
 * @template R - response body type
 * @template P - request parameter type
 *
 * @param {string} uri - server endpoint
 * @param {string} method - get, post, patch, put, delete
 * @param {T} data - data type
 * @param {P} params - request parameter
 */

async function refreshRequest<T, R, P>({
  uri,
  method,
  data,
  params,
}: IRequest<T, P>) {
  const config: AxiosRequestConfig = {
    url: uri,
    method,
    data,
    params,
  };

  const response = await refreshInstance<T, AxiosResponse<IResponse<R>>>(
    config,
  );
  return response.data;
}

export default refreshRequest;
