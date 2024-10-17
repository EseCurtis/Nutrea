import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";
import { Workout } from "../../../store/WorkoutStore";
import moment from "moment";

export function useGetHistory<T = any>({
  start_date,
  challenge_id,
  options,
}: {
  options?: UseQueryOptions<any, any, any, string[]>;
  start_date: string;
  challenge_id?: string;
}) {
  return usePaginatedQuery<T>({
    queryKey: ["history", start_date, challenge_id || ""],
    url: `/workout?start_date=${start_date}${
      challenge_id ? `&challenge_id=${challenge_id}` : ""
    }`,
    enabled: true,
    options,
  });
}
