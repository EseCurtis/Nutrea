import { UseQueryOptions } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";

export function useGetDailyStepChallenge<T = any>(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<T>({
    queryKey: ["daily-step-challenge"],
    url: `/challenge/daily-step-challenge`,
    enabled: true,
    options,
  });
}
