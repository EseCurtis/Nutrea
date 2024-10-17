import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useBlockUnblockUser(
  user_id?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: `user/block-unblock/${user_id}`,
    options,
  });
}
