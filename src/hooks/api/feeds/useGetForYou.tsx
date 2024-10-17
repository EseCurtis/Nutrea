import { usePaginatedQuery } from "../usePaginatedQuery";
import { UseQueryOptions } from "@tanstack/react-query";

export function useGetForYou<T = any>({
  user_id,
  group_id,
  search,
  options,
  with_files = false,
  for_search
}: {
  options?: UseQueryOptions<any, any, any, string[]>;
  user_id?: string;
  group_id?: string;
  search?: string;
  with_files?: boolean;
  for_search?: boolean;
}) {
  return usePaginatedQuery<T>({
    queryKey: [
      "feeds",
      "discover",
      "foryou",
      user_id || "",
      group_id || "",
      search as string
    ],
    url: `/feed/discover?with_files=${with_files}${
      user_id ? `&user_id=${user_id}` : ""
    }${group_id ? `&group_id=${group_id}` : ""}${
      search ? `&search=${search}` : ""
    }`,
    options,
    enabled: options?.enabled,
    silent: true
  });
}
