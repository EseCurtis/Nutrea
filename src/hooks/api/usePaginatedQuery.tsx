import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query"; // Fixed import path
import useHttp, { Method } from "./useHttp";
import { useHandleError } from "./useHandleError";
import { AuthStore } from "../../store/AuthStore";

export type Args = {
  queryKey: string[];
  url: string;
  options?: UseQueryOptions<any, any, any, string[]>;
  enabled?: boolean;
  method?: Method;
  requestBody?: any;
  keepPreviousData?: boolean;
  silent?: boolean;
};

export function usePaginatedQuery<T>({
  queryKey,
  enabled = true,
  url,
  options,
  method = "get",
  requestBody,
  keepPreviousData = true,
  silent,
}: Args): UseInfiniteQueryResult<T, unknown> {
  const { token } = AuthStore.useState((s) => s);
  const api = useHttp({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  const { handleError } = useHandleError();

  const checkIfUrlHasQueryParams = url.includes("?");
  const queryParam = checkIfUrlHasQueryParams ? "&" : "?";

  // @ts-ignore
  return useInfiniteQuery<T>( // Specify the generic type parameter T for useInfiniteQuery
    queryKey,
    async ({ pageParam = 1 }) => {
      const res = await api[method](
        `${url}${queryParam}page=${pageParam}&limit=8`,
        requestBody
      );
      return res?.data?.data;
    },
    // @ts-ignore
    {
      enabled,
      getNextPageParam: (lastPage: any) => {
        return lastPage?.meta?.next_page || undefined;
      }, // Simplified getNextPageParam
      onError: (e: any) => {
        console.error(e.response?.data); // Use console.error for errors
        handleError(e, silent);
      },
      keepPreviousData,
      ...options,
    }
  );
}
