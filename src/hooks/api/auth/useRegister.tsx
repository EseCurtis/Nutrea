import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";
import { User } from "../../../types/User";

export interface IAuthResponse {
  data: { token: string; user: User };
}

export function useRegister(
  options?: UseMutationOptions<IAuthResponse, unknown, void, unknown>
) {
  return useTMutation({
    url: "/user/create",
    options,
  });
}
