import { usePaginatedQuery } from "../usePaginatedQuery";
import { UseQueryOptions } from "@tanstack/react-query";

export function useGetReferral<T = any>(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return usePaginatedQuery<T>({
    queryKey: ["referrals"],
    url: "/user/me/referrals",
    enabled: true,
    options,
  });
}
