import React, { Suspense } from 'react';
import Loading from '@/components/loading/Loading';
import UserDetail from '@/components/User/detail/UserDetail';

function UserDetailPage() {
  return (
    <Suspense fallback={<Loading ment="로딩 중입니다." />}>
      <UserDetail />
    </Suspense>
  );
}

export default UserDetailPage;
