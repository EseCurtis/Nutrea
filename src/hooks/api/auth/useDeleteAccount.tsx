import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useDeleteAccount(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: "/user/auth/delete-account",
    options,
  });
}
