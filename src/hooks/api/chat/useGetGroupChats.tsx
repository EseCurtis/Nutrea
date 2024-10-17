import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";
import { Comment } from "../../../utils/types/Feed";

export function useGetGroupChats<T = Comment>(
  search?: string,
  options?: UseQueryOptions<Comment, any, any, string[]>
) {
  return usePaginatedQuery<T>({
    queryKey: ["group-chats", search!],
    url: `/chat/group-chat${search ? `?search=${search}` : ""}`,
    enabled: true,
    options,
  });
}
