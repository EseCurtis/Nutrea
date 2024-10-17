import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";

export function useGetChats<T = any>(
  search: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return usePaginatedQuery<T>({
    queryKey: ["chat", search],
    url: `/chat${search ? `?search=${search}` : ""}`,
    enabled: true,
    options,
    silent: true,
  });
}
