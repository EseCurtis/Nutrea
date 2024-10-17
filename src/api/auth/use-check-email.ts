import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';

type Variables = { email: string };
type Response = any;

export const useCheckEmail = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'user/check-email',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
