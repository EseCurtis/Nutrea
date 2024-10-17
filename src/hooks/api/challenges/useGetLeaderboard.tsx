import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";

export function useGetLeaderboard<T = any>(
  challenge_id: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return usePaginatedQuery<T>({
    queryKey: ["participants", challenge_id],
    url: `/challenge/${challenge_id}/participants`,
    enabled: !!challenge_id,
    options,
  });
}
