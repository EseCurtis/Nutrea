import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { AuthStore } from "../../../store/AuthStore";

export interface IWallet {
  id: number;
  balance: number;
  currency: string;
  user: number;
}

export function useGetWallet(
  options?: UseQueryOptions<any, any, IWallet, string[]>
): UseQueryResult<IWallet, unknown> {
  const { token } = AuthStore.useState((s) => s);

  return useTQuery({
    queryKey: ["wallet"],
    url: "/wallets/user",
    options: {
      ...options,
      enabled: !!token,
    },
  });
}
