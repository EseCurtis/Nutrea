import { UseQueryOptions } from "@tanstack/react-query";
import { useTQuery } from "../useTQuery";
import { Feed } from "../../../utils/types/Feed";

export default function useGetProfile<T = any>(
  id: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<T>({
    queryKey: ["profile", id],
    url: `/user/all/${id}`,
    enabled: !!id,
    options,
    silent: true,
  });
}
