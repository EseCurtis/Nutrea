import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";

export function useGetGroups<T = any>({
  search,
  options,
  userId,
}: {
  search?: string;
  options?: UseQueryOptions<any, any, any, string[]>;
  userId?: string;
}) {
  return usePaginatedQuery<T>({
    queryKey: ["groups", search, userId],
    url: `/group${search ? `?search=${search}` : ""}${
      userId ? `?user_id=${userId}` : ""
    }`,
    enabled: true,
    options,
  });
}
