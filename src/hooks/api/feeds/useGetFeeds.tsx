import { usePaginatedQuery } from "../usePaginatedQuery";
import { UseQueryOptions } from "@tanstack/react-query";
import { RepostStore } from "@/src/store/RepostStore";
import { Feed } from "@/src/types/Feed";

export function useGetFeeds<T = any>({
  user_id,
  group_id,
  search,
  options,
  with_files = false,
  for_search,
  is_for_you,
}: {
  options?: UseQueryOptions<any, any, any, string[]>;
  user_id?: string;
  group_id?: string;
  search?: string;
  with_files?: boolean;
  for_search?: boolean;
  is_for_you?: boolean;
}) {
  //const { repostedFeeds } = RepostStore.useState((s) => s);
  const response = usePaginatedQuery<T>({
    queryKey: ["feeds_", user_id || "", group_id || "", search as string],
    url: `/feed?with_files=${with_files}${
      user_id ? `&user_id=${user_id}` : ""
    }${group_id ? `&group_id=${group_id}` : ""}${
      search ? `&search=${search}` : ""
    }${is_for_you ? `&is_for_you=${is_for_you}` : ""}`,
    options,
    enabled: options?.enabled,
    silent: true
  });

  // const feeds = response?.data?.pages
  //   ?.map((e: any) => e.feeds)
  //   .flat() as Feed[];

  // RepostStore.update((s) => {
  //   s.repostedFeeds = [
  //     ...repostedFeeds,
  //     ...((feeds && feeds) || []).filter((feed) => Boolean(feed?.original_post))
  //   ];
  // });

  return response;
}
