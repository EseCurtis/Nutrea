import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";
import { IAuthResponse } from "./useRegister";

export function useSocialLogin(
  options?: UseMutationOptions<IAuthResponse, unknown, void, unknown>
) {
  return useTMutation({
    url: "/user/login/social",
    options,
  });
}
