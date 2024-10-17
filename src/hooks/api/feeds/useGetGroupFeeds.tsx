import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";
import { Comment } from "../../../utils/types/Feed";
import { Group, GroupStore } from "../../../store/GroupStore";
import { AuthStore } from "../../../store/AuthStore";

export function useGetGroupFeeds<T = Group>(
  groupId?: number,
  search?: string,
  options?: UseQueryOptions<Group, any, any, string[]>
) {
  const { user } = AuthStore.useState((s) => s);
  const { group } = GroupStore.useState((s) => s);
  const isMember = group?.members?.find((e) => e.id === (user?.id as any));

  return usePaginatedQuery<T>({
    queryKey: ["feeds", "group", `${groupId}`],
    url: `/feeds/trending?group=${groupId}&search=${search}`,
    enabled: isMember ? true : false,
    options,
  });
}
