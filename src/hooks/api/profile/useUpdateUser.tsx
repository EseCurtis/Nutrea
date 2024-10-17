import { UseMutationOptions } from "@tanstack/react-query";
import { useTMutation } from "../useTMutation";
import { AuthStore } from "../../../store/AuthStore";
import { useToast } from "../../../contexts/ToastProvider";

export function useUpdateUser(
  options?: UseMutationOptions<any, unknown, void, unknown>,
  noMessage?: boolean
) {
  const { show } = useToast();

  return useTMutation({
    url: "/user/me",
    options: {
      ...options,
      onSuccess: (data) => {
        console.log("BREEETE", data);
        !noMessage &&
          show({
            message: "Saved Successfully",
            type: "success"
          });

        AuthStore.update((s) => {
          s.user = data?.data;
        });

        //   @ts-ignore
        if (options?.onSuccess) options?.onSuccess(data);
      }
    },
    method: "put"
  });
}