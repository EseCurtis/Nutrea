import { usePaginatedQuery } from "../usePaginatedQuery";
import { UseQueryOptions } from "@tanstack/react-query";

export function useGetDiscover<T = any>(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return usePaginatedQuery<T>({
    queryKey: ["feeds", "discover"],
    url: "/feed/discover",
    options,
    enabled: options?.enabled ?? true,
    silent: true,
  });
}
