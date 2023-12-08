import { http, HttpResponse } from 'msw';
import BASE_URL from '@/config';
import user from '../data/user.json';
import setResponse from '../response';

const userHandler = [
  http.get(`${BASE_URL}/api/user`, () => {
    const response = setResponse(user);
    return HttpResponse.json(response);
  }),
];

export default userHandler;
