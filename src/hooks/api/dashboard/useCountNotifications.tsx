import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { AuthStore } from "../../../store/AuthStore";

export function useCountNotifications(
  options?: UseQueryOptions<any, any, any, string[]>
): UseQueryResult<any, unknown> {
  const { token } = AuthStore.useState((s) => s);

  return useTQuery({
    queryKey: ["notification-count"],
    url: "notification/count",
    options: {
      ...options,
      enabled: !!token,
    },
  });
}
