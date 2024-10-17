import { UseQueryOptions } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { Feed } from "../../../utils/types/Feed";

export function useGetSingleGroup<T = Feed>(
  group_id: string,
  options?: UseQueryOptions<Feed, any, any, string[]>
) {
  return useTQuery<T>({
    queryKey: ["single-group", group_id],
    url: `/group/${group_id}`,
    enabled: !!group_id,
    options,
    silent: true,
  });
}
