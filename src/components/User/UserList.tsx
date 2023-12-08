import React from 'react';
import useGetUser from '@/query/get/useGetUser';

import * as U from './style/UserList.style';
import EachUser, { type User } from './EachUser';

function UserList() {
  const { users } = useGetUser<User[]>();

  return (
    <U.Container>
      {users?.map((user) => <EachUser key={user.id} user={user} />)}
    </U.Container>
  );
}

export default UserList;
