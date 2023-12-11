import { http, HttpResponse } from 'msw';
import BASE_URL from '@/config';
import user from '../data/user.json';
import setResponse from '../response';

const userHandler = [
  http.get(`${BASE_URL}/api/user`, () => {
    const response = setResponse(user);
    return HttpResponse.json(response);
  }),

  // pagination
  http.get(`${BASE_URL}/api/user/page`, async ({ request }) => {
    const queryParams = new URLSearchParams(new URL(request.url).search);

    const page = Number(queryParams.get('page'));
    const size = Number(queryParams.get('size'));

    const pageItem = () => {
      return user.slice(page * size, (page + 1) * size);
    };

    const response = setResponse({
      totalElements: user.length,
      data: pageItem(),
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    return HttpResponse.json(response);
  }),

  // 멤버 상세
  http.get(`${BASE_URL}/api/user/:nickname`, async ({ request }) => {
    const queryParams = new URLSearchParams(new URL(request.url).search);

    const nick = queryParams.get('nickname');
    const foundUser = user.find((member) => member.nickname === nick);
    const response = setResponse(foundUser);

    return HttpResponse.json(response);
  }),

  // 수정
  http.patch(`${BASE_URL}/api/user`, async () => {
    const response = setResponse({ nickname: `유저 수정 성공` });
    return HttpResponse.json(response);
  }),
];

export default userHandler;
