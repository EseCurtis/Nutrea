import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useLogout(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: "/user/auth/logout",
    options,
  });
}
