import { UseQueryOptions } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { Course } from "../../../utils/types/Course";

export default function useGetSingleCourse<T = Course>(
  id: number,
  options?: UseQueryOptions<Course, any, any, string[]>
) {
  return useTQuery<T>({
    queryKey: ["single-course"],
    url: `/courses/${id}`,
    enabled: true,
    options,
  });
}
