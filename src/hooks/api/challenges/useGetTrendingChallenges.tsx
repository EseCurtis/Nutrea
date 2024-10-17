import { UseQueryOptions } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { Challenge } from "./useGetChallenges";

export default function useGetTrendingChallenges<T = Challenge[]>(
  options?: UseQueryOptions<Challenge[], any, any, string[]>
) {
  return useTQuery<T>({
    queryKey: ["challenges", "trending-challenges"],
    url: "/challenges/trending",
    enabled: true,
    options,
  });
}
