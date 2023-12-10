import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetUserDetail from '@/query/get/useGetUserDetail';

import * as D from './style/detail.style';

function UserDetail() {
  const { nickname } = useParams();
  const { user } = useGetUserDetail({ nickname: nickname as string });

  const navigate = useNavigate();

  const goList = () => {
    navigate('/user');
  };

  return (
    <D.Container>
      {user !== undefined && (
        <>
          <D.Element>{user.id}</D.Element>
          <D.Element>{user.major}</D.Element>
          <D.Element>{user.name}</D.Element>
          <D.Element>{user.nickname}</D.Element>
          <D.Element>{user.phoneNumber}</D.Element>
          <D.Element>{user.role}</D.Element>
        </>
      )}

      <button onClick={goList}>목록으로</button>
    </D.Container>
  );
}

export default UserDetail;
