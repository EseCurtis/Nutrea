import { AxiosRequestConfig } from "axios";
import useHttp, { Method } from "./useHttp";
import { useHandleError } from "./useHandleError";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { generateUrlParamsFromObject } from "../../utils/generateUrlParamsFromObject";
import { AuthStore } from "../../store/AuthStore";
import { useSession } from "@/src/contexts/AuthContext";

type Args = {
  url: string;
  options?: UseMutationOptions<any, unknown, any, unknown>;
  method?: Method;
  pathParams?: string[];
  appendQueryParams?: boolean;
  config?: AxiosRequestConfig<any>;
};

export function useTMutation({
  url,
  options,
  method = "post",
  pathParams,
  appendQueryParams = false,
  config,
}: Args): UseMutationResult<any, unknown, any, unknown> {
  const { session } = useSession();
  //console.log("NUNNN::",token)
  const api = useHttp({
    config,
    headers: {
      Authorization: session ? `Bearer ${session}` : "",
    },
  });

  const { handleError } = useHandleError();

  return useMutation(
    async (requestBody) => {
      if (pathParams) {
        return api[method](
          `${url}/${generateUrlParamsFromObject({
            data: requestBody,
            acceptedPathParams: pathParams,
          })}`
        ).then((res) => res.data);
      }

      if (appendQueryParams) {
        return api[method](
          `${url}${generateUrlParamsFromObject({
            data: requestBody,
          })}`
        ).then((res) => res.data);
      }

      if (method === "delete") {
        return api
          .delete(`${url}`, {
            data: requestBody,
          })
          .then((res) => res.data);
      }

      return api[method](`${url}`, requestBody).then((res) => res.data);
    },

    {
      onError(e) {
        handleError(e);
      },
      ...options,
    }
  );
}
