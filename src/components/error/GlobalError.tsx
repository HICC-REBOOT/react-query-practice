import React from 'react';
import { AxiosError } from 'axios';
import { FallbackProps } from 'react-error-boundary';
import { IError } from '@utils/axios';

const getAxiosError = (error: AxiosError): IError | undefined => {
  const serverError = error as AxiosError<IError>;
  return serverError.response?.data;
};

function GlobalError({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage = getAxiosError(error as AxiosError);
  return (
    <div>
      <p>{errorMessage?.message}</p>
      <button onClick={resetErrorBoundary}>재시도</button>
    </div>
  );
}

export default GlobalError;
