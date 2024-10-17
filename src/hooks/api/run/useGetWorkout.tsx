import { usePaginatedQuery } from "../usePaginatedQuery";
import { UseQueryOptions } from "@tanstack/react-query";

export function useGetWorkouts<T = any>({
  options
}: {
  options?: UseQueryOptions<any, any, any, string[]>;
}) {
  return usePaginatedQuery<T>({
    queryKey: [
      "workouts",
    ],
    url: `/workout`,
    options,
    enabled: options?.enabled,
    silent: true
  });
}
