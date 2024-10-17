import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useLeaveGroupChat(
  id: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: `/chat/group-chat/${id}/leave`,
    options,
  });
}
