import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { AuthStore } from "../../../store/AuthStore";

export function useGetEarning(
  startDate: string,
  options?: UseQueryOptions<any, any, any, string[]>
): UseQueryResult<any, unknown> {
  const { token } = AuthStore.useState((s) => s);

  return useTQuery({
    queryKey: ["earning", startDate],
    url: `/wallet/earnings?start_date=${startDate}`,
    options: {
      ...options,
      enabled: !!token,
    },
    silent: true,
  });
}
