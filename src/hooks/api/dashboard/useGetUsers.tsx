import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";

export function useGetUsers<T = any>({
  userType,
  search,
  options,
}: {
  search?: string;
  userType?: "user" | "influencer";
  options?: UseQueryOptions<any, any, any, string[]>;
}) {
  return usePaginatedQuery<T>({
    queryKey: ["users"],
    url: `/user/all${search ? `?search=${search}` : ""}`,
    enabled: true,
    options,
    silent: true,
  });
}
