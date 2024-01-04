import React from 'react';
import useServerSidePagination from '@query/get/useServerSidePagination';

import * as U from './style/UserList.style';
import EachUser, { type User } from './EachUser';

function UserList() {
  const { curPageItem, renderPaginationBtn } = useServerSidePagination<User>({
    uri: '/api/user/page',
    size: 5,
  });

  return (
    <U.Container>
      {curPageItem.map((user) => (
        <EachUser key={user.id} user={user} />
      ))}
      {renderPaginationBtn()}
    </U.Container>
  );
}

export default UserList;
