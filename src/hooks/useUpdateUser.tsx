import React from "react";
import { AuthStore } from "../store/AuthStore";
import { useGetUserWithoutContext } from "./api/auth/useGetCurrentUser";

export function useUpdateUser() {
  const { token } = AuthStore.useState((s) => s);

  const { mutate } = useGetUserWithoutContext({
    onSuccess: (data) => {
      AuthStore.update((s) => {
        s.user = data?.data;
      });
    },
    onError: (err: any) => {},
  });

  const updateUser = () => {
    mutate(token);
  };

  return { updateUser };
}
