import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";
import { AuthStore } from "../../../store/AuthStore";

export function useGetJoinedChallenges<T = any>({
  group_chat_id,
  group_id,
  options,
}: {
  options?: UseQueryOptions<any, any, any, string[]>;
  group_id?: string;
  group_chat_id?: string;
}) {
  const { token } = AuthStore.useState((s) => s);

  return usePaginatedQuery<T>({
    queryKey: ["challenges", "joined-challenges", group_chat_id!],
    url: `/challenge/joined${
      group_chat_id ? `?group_chat_id=${group_chat_id}` : ""
    }`,
    enabled: !!token,
    options,
  });
}
