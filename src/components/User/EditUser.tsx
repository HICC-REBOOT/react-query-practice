import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import usePatchUserInfo from '@query/patch/usePatchUserInfo';
import { type User } from './EachUser';

import * as U from './style/EditUser.style';

function EditUser() {
  const location = useLocation();
  const userState = location.state as User;

  const { register, handleSubmit } = useForm<User>({
    defaultValues: userState,
  });

  const { patchUser, isPending, isSuccess } = usePatchUserInfo({
    nickname: userState.nickname,
  });

  const onSubmit = async (data: User) => {
    patchUser(data);
  };

  return (
    <U.Container onSubmit={handleSubmit(onSubmit)}>
      <U.Row>
        <U.Label>닉네임</U.Label>
        <U.Input type="text" {...register('nickname', { required: true })} />
      </U.Row>
      <U.Row>
        <U.Label>이름</U.Label>
        <U.Input type="text" {...register('name', { required: true })} />
      </U.Row>
      <U.Row>
        <U.Label>아이디</U.Label>
        <U.Input type="text" {...register('id', { required: true })} />
      </U.Row>
      <U.Row>
        <U.Label>전화번호</U.Label>
        <U.Input type="text" {...register('phoneNumber', { required: true })} />
      </U.Row>
      <U.Row>
        <U.Label>등급</U.Label>
        <U.Input type="text" {...register('role', { required: true })} />
      </U.Row>
      <U.Row>
        <U.Label>전공</U.Label>
        <U.Input type="text" {...register('major', { required: true })} />
      </U.Row>
      <button type="submit">제출</button>
    </U.Container>
  );
}

export default EditUser;
