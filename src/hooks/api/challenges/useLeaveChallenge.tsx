import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useLeaveChallenge(
  challenge_id: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: `/challenge/leave/${challenge_id}`,
    options,
  });
}
