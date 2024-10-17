import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";
import { IAuthResponse } from "./useRegister";

export function useVerifyResetPasswordCode(
  options?: UseMutationOptions<IAuthResponse, unknown, void, unknown>
) {
  return useTMutation({
    url: "/user/reset-password/verify",
    options,
  });
}
