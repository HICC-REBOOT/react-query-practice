import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from '@/components/loading/Loading';
import UserDetail from '@/components/User/detail/UserDetail';
import GlobalError from '@/components/error/GlobalError';

function UserDetailPage() {
  return (
    <ErrorBoundary FallbackComponent={GlobalError}>
      <Suspense fallback={<Loading ment="로딩 중입니다." />}>
        <UserDetail />
      </Suspense>
    </ErrorBoundary>
  );
}

export default UserDetailPage;
