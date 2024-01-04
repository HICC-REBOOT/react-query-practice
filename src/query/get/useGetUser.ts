import { useQuery } from '@tanstack/react-query';
import request from '@utils/request';

function useGetUser<T>() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getUser'],
    queryFn: async () => {
      const response = await request<null, T, null>({
        uri: '/api/user',
        method: 'get',
      });

      return response.data;
    },
  });

  return {
    users: data,
    isLoading,
    error,
  };
}

export default useGetUser;
