import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useCreateGroupChat(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: `/chat/group-chat`,
    options,
  });
}
