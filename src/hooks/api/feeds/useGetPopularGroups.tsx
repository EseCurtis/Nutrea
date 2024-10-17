import { UseQueryOptions } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { Group } from "../../../store/GroupStore";

export function useGetPopularGroups<T = Group>(
  options?: UseQueryOptions<Group, any, any, string[]>
) {
  return useTQuery<T>({
    queryKey: ["groups", "popular-groups"],
    url: `/groups/popular`,
    enabled: true,
    options,
  });
}
