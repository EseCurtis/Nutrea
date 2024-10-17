import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";

export function useGetGlobalLeaderboard<T = any>(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return usePaginatedQuery<T>({
    queryKey: ["participant", "global-leaderboard"],
    url: `/challenge/global-leaderboard`,
    enabled: true,
    options,
  });
}
