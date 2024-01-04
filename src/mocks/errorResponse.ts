interface IResponse<R> {
  timestamp: string;
  isSuccess: boolean;
  code: string;
  message: string;
  data: R;
}

const setErrorResponse = <R>(data: R) => {
  const response: IResponse<R> = {
    timestamp: '2023-12-08',
    isSuccess: false,
    code: 'access_expired',
    message: '호출 실패',
    data,
  };

  return response;
};

export default setErrorResponse;
