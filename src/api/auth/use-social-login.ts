import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';

type Variables = { provider: string; wallet_address: string };
type Response = { data: string };

export const useSocialLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'user/login/social',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
