import { http, HttpResponse } from 'msw';
import BASE_URL from '@/config';
import setResponse from '../response';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const authHandler = [
  http.post(`${BASE_URL}/api/auth/login/`, async () => {
    const response = setResponse<LoginResponse>({
      accessToken: 'access',
      refreshToken: 'refresh',
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    return HttpResponse.json(response);
  }),
];

export default authHandler;
