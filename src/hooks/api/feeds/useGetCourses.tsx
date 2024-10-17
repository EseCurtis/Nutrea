import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";
import { Course } from "../../../utils/types/Course";

interface Response {
  data: Course[];
  count: number;
}

export function useGetCourses<T = Response>(
  user: number,
  options?: UseQueryOptions<Response, any, any, string[]>
) {
  return usePaginatedQuery<T>({
    queryKey: ["courses"],
    url: `/courses?user=${user}`,
    enabled: true,
    options,
  });
}
