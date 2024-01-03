import { setCookie } from '@/utils/cookie';
import request from '@/utils/request';

interface LoginData {
  id: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

async function login(data: LoginData) {
  const response = await request<LoginData, LoginResponse, null>({
    uri: '/api/auth/login/',
    method: 'post',
    data,
  });

  setCookie('refresh', response.data.refreshToken, {
    path: '/',
    httpOnly: false,
  });

  return response.data.accessToken;
}

export default login;
