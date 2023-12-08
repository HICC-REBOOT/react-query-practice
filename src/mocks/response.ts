interface IResponse<R> {
  timestamp: string;
  isSuccess: boolean;
  code: string;
  message: string;
  data: R;
}

const setResponse = <R>(data: R) => {
  const response: IResponse<R> = {
    timestamp: '2023-12-08',
    isSuccess: true,
    code: '200',
    message: '호출 성공',
    data,
  };

  return response;
};

export default setResponse;
