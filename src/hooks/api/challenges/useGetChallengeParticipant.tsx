import { UseQueryOptions } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";

export function useGetChallengeParticipant<T = any>(
  challenge_id: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<T>({
    queryKey: ["challenge-participant", challenge_id],
    url: `/challenge/joined/${challenge_id}`,
    enabled: !!challenge_id,
    options,
  });
}
