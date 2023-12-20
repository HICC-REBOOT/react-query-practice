import { useQuery } from '@tanstack/react-query';
import { User } from '@/components/User/EachUser';
import request from '@/utils/request';

interface userDetailParams {
  nickname: string;
}

function useGetUserDetail({ nickname }: userDetailParams) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getUserDetail', nickname],
    queryFn: async () => {
      const response = await request<null, User, userDetailParams>({
        uri: `/api/user/${nickname}`,
        method: 'get',
        params: {
          nickname,
        },
      });

      return response.data;
    },
  });

  return {
    user: data,
    isLoading,
    error,
  };
}

export default useGetUserDetail;
