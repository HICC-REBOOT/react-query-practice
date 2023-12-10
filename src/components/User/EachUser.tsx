import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as EU from './style/EachUser.style';

export interface User {
  nickname: string;
  name: string;
  id: string;
  phoneNumber: string;
  role: string;
  major: string;
}

interface EachUserProps {
  user: User;
}

function EachUser({ user }: EachUserProps) {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`${user.nickname}`);
  };

  return (
    <EU.Container onClick={goDetail}>
      <EU.Column>{user.id}</EU.Column>
      <EU.Column>{user.nickname}</EU.Column>
      <EU.Column>{user.name}</EU.Column>
      <EU.Column>{user.phoneNumber}</EU.Column>
      <EU.Column>{user.role}</EU.Column>
      <EU.Column>{user.major}</EU.Column>
    </EU.Container>
  );
}

export default EachUser;
