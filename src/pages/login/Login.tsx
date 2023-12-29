import React from 'react';
import { useSetRecoilState } from 'recoil';
import login from '@/auth/login';
import tokenStorage from '@/auth/token';

function Login() {
  const setAccess = useSetRecoilState(tokenStorage);

  const requestLogin = async () => {
    const data = { id: 'B731070', password: 'hicc' };
    const access = await login(data);
    setAccess(access);
    alert('로그인이 완료되었습니다.');
  };

  return (
    <div>
      <button onClick={requestLogin}>login</button>
    </div>
  );
}

export default Login;
