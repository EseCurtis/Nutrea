import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useJoinChallenge(
  challenge_id: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: `/challenge/join/${challenge_id}`,
    options,
  });
}
