import { getCookie, setCookie } from './cookie';
import refreshRequest from './refreshRequest';

interface Rissue {
  accessToken: string;
  refreshToken: string;
}

interface RefreshParam {
  refresh: string;
}

async function reissue() {
  const refresh = getCookie('refresh');

  const response = await refreshRequest<null, Rissue, RefreshParam>({
    uri: '/api/auth/refresh',
    method: 'post',
    params: {
      refresh,
    },
  });

  setCookie('refresh', response.data.refreshToken, {
    path: '/',
    httpOnly: true,
  });

  return response.data.accessToken;
}

export default reissue;
