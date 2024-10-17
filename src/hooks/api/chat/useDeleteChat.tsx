import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useDeleteChat(
  chat_id?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: `/chat/${chat_id}`,
    options,
    method: "delete",
  });
}
