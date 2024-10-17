import { UseQueryOptions } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";

export function useGetMessages<T = any>(
  reciever_id: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return usePaginatedQuery<T>({
    queryKey: ["chat", reciever_id],
    url: `/chat/messages?reciever_id=${reciever_id}`,
    enabled: true,
    options,
    silent: true,
  });
}
