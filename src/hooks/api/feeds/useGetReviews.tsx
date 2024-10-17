import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";
import { Review } from "../../../utils/types/Review";

interface Response {
  data: Review[];
  count: number;
}

export function useGetReviews<T = Response>(
  course?: string,
  options?: UseQueryOptions<Response, any, any, string[]>
) {
  return usePaginatedQuery<T>({
    queryKey: ["reviews", `${course}`],
    url: `/reviews?course=${course}`,
    enabled: true,
    options,
  });
}
