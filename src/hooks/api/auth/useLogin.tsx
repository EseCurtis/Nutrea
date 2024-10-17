import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";
import { IAuthResponse } from "./useRegister";

export function useLogin(
  options?: UseMutationOptions<IAuthResponse, unknown, void, unknown>
) {
  return useTMutation({
    url: "/user/login",
    options,
  });
}
