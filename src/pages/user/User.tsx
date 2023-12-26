import React, { Suspense } from 'react';
import Loading from '@/components/loading/Loading';
import UserList from '@/components/User/UserList';

function UserPage() {
  return (
    <Suspense fallback={<Loading ment="로딩 중입니다." />}>
      <UserList />
    </Suspense>
  );
}

export default UserPage;
