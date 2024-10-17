import * as WebBrowser from "expo-web-browser";
import { baseUrl } from "../utils";
import { useState } from "react";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

export function useFacebookAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      let result = await WebBrowser.openAuthSessionAsync(
        `${baseUrl}/user/login/facebook`
      );
      if (result.type === "success") {
        if (result.url.includes("token")) {
          let token = result.url.split("token=")?.[1]?.replace("#_=_", "");

          return await axios
            .get(`${baseUrl}/user/me`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((data) => {
              const response = data.data?.data;
              return { token, user: response };
            });
        } else {
          throw new Error("Error while logging in with Facebook");
        }
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error while logging in with Facebook");
    } finally {
      setIsLoading(false);
    }
  };

  return { onLogin, isLoading };
}
