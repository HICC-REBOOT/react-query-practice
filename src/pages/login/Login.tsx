import React from 'react';
import { useNavigate } from 'react-router-dom';
import login from '@auth/login';

function Login() {
  const navigate = useNavigate();

  const requestLogin = async () => {
    const data = { id: 'B731070', password: 'hicc' };
    const access = await login(data);
    localStorage.setItem('access', access);
    alert('로그인이 완료되었습니다.');
    navigate('/user');
  };

  return (
    <div>
      <button onClick={requestLogin}>login</button>
    </div>
  );
}

export default Login;
