import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { accessToken } from '@/core';

import { client } from '../common';
import type { User } from './types';

type Variables = any;
type Response = {
  data: User;
};

export const useLoggedInUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async () =>
    client
      .get('user/me', {
        headers: {
          Authorization: `Bearer ${accessToken()?.access}`,
        },
      })
      .then((response) => response.data),
});
