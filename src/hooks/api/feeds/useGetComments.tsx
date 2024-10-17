import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";
import { CommentType } from "../../../types/Comment";

export function useGetComments<T = any>({
  feed_id,
  parent_id,
  type,
  options,
}: {
  feed_id?: string;
  parent_id?: string;
  options?: UseQueryOptions<any, any, any, string[]>;
  type: CommentType;
}) {
  return usePaginatedQuery<T>({
    queryKey: ["comments", feed_id || "", parent_id || ""],
    url: `/comment?type=${type}${feed_id ? `&feed_id=${feed_id}` : ""}${
      parent_id ? `&parent_id=${parent_id}` : ""
    }`,
    enabled: true,
    options,
    silent: true,
  });
}
