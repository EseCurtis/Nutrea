import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useCheckEmail(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: "/user/check-email",
    options,
  });
}
