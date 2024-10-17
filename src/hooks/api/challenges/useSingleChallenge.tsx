import { UseQueryOptions } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";

export function useSingleChallenge<T = any>(
  id: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<T>({
    queryKey: ["single-challenges"],
    url: `/challenge/${id}`,
    enabled: Boolean(id),
    options,
  });
}
