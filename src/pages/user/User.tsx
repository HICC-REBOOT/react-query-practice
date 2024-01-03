import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from '@/components/loading/Loading';
import UserList from '@/components/User/UserList';
import GlobalError from '@/components/error/GlobalError';

function UserPage() {
  return (
    <ErrorBoundary FallbackComponent={GlobalError}>
      <Suspense fallback={<Loading ment="로딩 중입니다." />}>
        <UserList />
      </Suspense>
    </ErrorBoundary>
  );
}

export default UserPage;
