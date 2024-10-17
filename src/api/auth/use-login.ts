import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { User } from './types';

type Variables = {
  identifier: string;
  password: string;
};
type Response = {
  data: {
    token: string;
    user: User;
  };
};

export const useLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'user/login',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
