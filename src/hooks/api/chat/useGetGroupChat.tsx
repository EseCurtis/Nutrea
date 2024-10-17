import { UseQueryOptions } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";

export function useGetGroupChat<T = any>(
  id: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<T>({
    queryKey: ["chat", id],
    url: `/chat/group-chat/${id}`,
    enabled: !!id,
    options,
    silent: true,
  });
}
