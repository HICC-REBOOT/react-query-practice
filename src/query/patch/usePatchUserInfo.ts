import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import request from '@/utils/request';
import { User } from '@/components/User/EachUser';

interface usePatchUserInfoProps {
  nickname: string;
}

interface ResponseType {
  nickname: string;
}

interface RUsePatchUserInfo {
  patchUser: UseMutateFunction<string | undefined, Error, User>;
  isPending: boolean;
  isSuccess: boolean;
  data?: string;
}

function usePatchUserInfo({
  nickname,
}: usePatchUserInfoProps): RUsePatchUserInfo {
  const queryClient = useQueryClient();
  const { mutate, data, isPending, isSuccess } = useMutation<
    string | undefined,
    Error,
    User
  >({
    mutationKey: ['editUser', nickname],
    mutationFn: async (user: User) => {
      const response = await request<User, ResponseType, null>({
        uri: '/api/user',
        method: 'patch',
        data: user,
      });
      return response?.data.nickname;
    },
    onSuccess: () => {
      // 성공하면 다시 서버에서 유저 상세 조회를 한다. 변경된 값이 조회될 것
      queryClient.refetchQueries({
        queryKey: ['getUserDetail', nickname],
      });
    },
  });
  return {
    patchUser: mutate,
    isPending,
    isSuccess,
    data,
  };
}

export default usePatchUserInfo;
