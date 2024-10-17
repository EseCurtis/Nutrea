import useHttp, { Method } from "./useHttp";
import { useHandleError } from "./useHandleError";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { AuthStore } from "../../store/AuthStore";
import { useSession } from "@/src/contexts/AuthContext";

export type Args = {
  queryKey: string[];
  url: string;
  options?: UseQueryOptions<any, any, any, string[]>;
  enabled?: boolean;
  // Allowing method to be passed because there might be need to
  // use useQuery for a post request so the request is made on ComponentDidMount
  // and to utilize useQuery specific features like cache tracking with queryKey
  method?: Method;
  requestBody?: any;
  silent?: boolean;
};

export function useTQuery<T>({
  queryKey,
  enabled = true,
  url,
  options,
  method = "get",
  requestBody,
  silent,
}: Args): UseQueryResult<T, unknown> {
  const { session } = useSession();
  //console.log(session)
  const api = useHttp({
    headers: {
      Authorization: session ? `Bearer ${session}` : "",
    },
  });
  const { handleError } = useHandleError();

  return useQuery(
    queryKey,
    () => api[method](`${url}`, requestBody).then((res) => res?.data),
    {
      enabled,
      onError(e) {
        handleError(e, silent);
      },
      ...options,
    }
  );
}
