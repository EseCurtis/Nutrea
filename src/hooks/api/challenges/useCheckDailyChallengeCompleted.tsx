import { UseQueryOptions } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";

export function useCheckDailyChallengeCompleted<T = boolean>(
  options?: UseQueryOptions<boolean, any, any, string[]>
) {
  return useTQuery<T>({
    queryKey: ["daily-challenges-completed"],
    url: `/user-workout-histories/has-completed-challenge`,
    enabled: true,
    options,
  });
}
