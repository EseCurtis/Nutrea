import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useReadNotification(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: `/notification/mark-as-read`,
    options,
    method: "get",
    appendQueryParams: true,
  });
}
