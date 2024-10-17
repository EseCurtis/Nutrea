import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";

export function useGetNotifications<T = any>(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return usePaginatedQuery<T>({
    queryKey: ["notifications"],
    url: "/notification",
    enabled: true,
    options,
    silent: true,
  });
}
