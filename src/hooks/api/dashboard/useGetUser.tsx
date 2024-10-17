import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { AuthStore } from "../../../store/AuthStore";

export function useGetUser(
  userId: string,
  options?: UseQueryOptions<any, any, any, string[]>
): UseQueryResult<any, unknown> {
  const { token } = AuthStore.useState((s) => s);

  return useTQuery({
    queryKey: ["users", userId],
    url: `/user/all/${userId}`,
    options: {
      ...options,
      enabled: !!token,
    },
    silent: true,
  });
}
