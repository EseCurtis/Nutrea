import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useRemoveMember(
  id: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: `/chat/group-chat/${id}/members/remove`,
    options,
  });
}
