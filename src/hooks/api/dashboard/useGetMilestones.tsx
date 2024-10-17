import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { AuthStore } from "../../../store/AuthStore";

export interface IMilestone {
  id: number;
  level: number;
  steps: number;
}

export function useGetMilestones(
  options?: UseQueryOptions<any, any, IMilestone[], string[]>
): UseQueryResult<IMilestone[], unknown> {
  const { token } = AuthStore.useState((s) => s);

  return useTQuery({
    queryKey: ["milestone"],
    url: "/milestones",
    options: {
      ...options,
      enabled: !!token,
    },
  });
}
