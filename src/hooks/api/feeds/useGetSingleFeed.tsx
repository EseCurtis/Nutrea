import { UseQueryOptions } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { Feed } from "../../../utils/types/Feed";

export default function useGetSingleFeed<T = Feed>(
  id: string,
  options?: UseQueryOptions<Feed, any, any, string[]>
) {
  return useTQuery<T>({
    queryKey: ["single-feed", id],
    url: `/feed/${id}`,
    enabled: true,
    options,
    silent: true,
  });
}
