import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { AuthStore } from "../../../store/AuthStore";

export interface IRecentTransaction {
  labels: string[];
  values: number[];
}

export function useGetRecentTransactions(
  options?: UseQueryOptions<any, any, IRecentTransaction, string[]>
): UseQueryResult<IRecentTransaction, unknown> {
  const { token } = AuthStore.useState((s) => s);

  return useTQuery({
    queryKey: ["recent-transactions"],
    url: "/transactions/recent",
    options: {
      ...options,
      enabled: !!token,
    },
  });
}
