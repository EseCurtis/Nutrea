import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { accessToken } from '@/core';

import { client } from '../common';
import type { User } from './types';

type Variables = User;
type Response = {
  data: {
    data: User;
  };
};

export const useUpdateUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'user/me',
      method: 'PUT',
      data: variables,
      headers: {
        Authorization: `Bearer ${accessToken()?.access}`,
      },
    }).then((response) => response.data),
});
