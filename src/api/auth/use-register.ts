import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import type { LoginDataType } from '@/core/auth/utils';

import { client } from '../common';
import type { User } from './types';

type Variables = LoginDataType;
type Response = {
  data: {
    token: string;
    user: User;
  };
};

export const useRegister = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'user/create',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
