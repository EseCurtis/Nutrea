import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useSaveWorkout(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: "/workout",
    options,
  });
}
