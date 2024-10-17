import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { OutgoingHttpHeaders } from "http2";
import { useAuth } from "../useAuth";
import { baseUrl } from "../../utils";

export type Method = "get" | "post" | "put" | "delete" | "patch";

export default function useHttp({
  config,
  headers,
}: {
  config?: AxiosRequestConfig<any>;
  headers?: OutgoingHttpHeaders;
}): AxiosInstance {
  const { signOut } = useAuth();

  const headerConfig = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  };

  const axiosInstance = axios.create({
    headers: headerConfig,
    baseURL: baseUrl,
    timeout: 30 * 1000,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      const data = response?.data;

      if (
        typeof data === "string" &&
        (data.includes("doctype html") || data.includes("<!"))
      ) {
        throw new Error("Service unavailable, please contact support");
      }

      return response;
    },
    async function (e) {
      const statusCode = e?.response?.status;
      const description = e?.response?.data?.message;
      const error = e?.response?.data?.error;

      if (description?.includes("Unauthorized")) {
        signOut();
      } else if (
        error === "invalid_token" ||
        error === "unauthorized" ||
        statusCode === 401
      ) {
        signOut();
      }

      return Promise.reject(e);
    }
  );

  return axiosInstance;
}
