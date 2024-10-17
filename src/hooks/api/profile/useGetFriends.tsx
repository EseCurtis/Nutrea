import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";
import { Comment } from "../../../utils/types/Feed";
import { AuthStore } from "../../../store/AuthStore";

export function useGetFriends<T = Comment>(
  search?: string,
  options?: UseQueryOptions<Comment, any, any, string[]>
) {
  const { user } = AuthStore.useState((s) => s);

  return usePaginatedQuery<T>({
    queryKey: ["friends", search!],
    url: `/follow/following?user_id=${user?.id}${
      search ? `&search=${search}` : ""
    }`,
    enabled: true,
    options,
  });
}
