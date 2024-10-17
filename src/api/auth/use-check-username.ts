import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';

type Variables = { username: string };
type Response = { data: string };

export const useCheckUsername = createMutation<Response, Variables, AxiosError>(
  {
    mutationFn: async (variables) =>
      client({
        url: 'user/me/username-check',
        method: 'POST',
        data: variables,
      }).then((response) => response.data),
  }
);
