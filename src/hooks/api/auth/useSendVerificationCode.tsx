import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";

export function useSendVerificationCode(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    url: "/user/email-otp",
    options,
  });
}
