import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";

export function useGetJoinedGroups<T = any>(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return usePaginatedQuery<T>({
    queryKey: ["joined-groups"],
    url: `/group/joined`,
    enabled: true,
    options,
  });
}
