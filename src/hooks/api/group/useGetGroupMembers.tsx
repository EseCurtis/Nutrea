import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";

export function useGetGroupMembers<T = any>({
  group_id,
  options,
  search,
}: {
  group_id: string;
  options?: UseQueryOptions<any, any, any, string[]>;
  search?: string;
}) {
  return usePaginatedQuery<T>({
    queryKey: ["group_members", group_id],
    url: `/group/members?group_id=${group_id}${
      search ? `&search=${search}` : ""
    }`,
    enabled: true,
    options,
    silent: true,
  });
}
