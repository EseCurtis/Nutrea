import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { AuthStore } from "../../../store/AuthStore";

export interface IRecentWorkout {
  labels: string[];
  values: number[];
  total: number;
  steps: number[];
  totalSteps: number;
}

export function useRecentWorkout(
  options?: UseQueryOptions<any, any, IRecentWorkout, string[]>
): UseQueryResult<IRecentWorkout, unknown> {
  const { token } = AuthStore.useState((s) => s);

  return useTQuery({
    queryKey: ["recent-workouts"],
    url: "/user-workout-histories/recent",
    options: {
      ...options,
      enabled: !!token,
    },
  });
}
