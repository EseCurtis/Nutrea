import React, { useCallback, useState } from "react";
import { baseUrl } from "../utils";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { toQueryString } from "../utils/toQueryString";
import { AuthStore } from "../store/AuthStore";
import axios from "axios";
import { useToast } from "../contexts/ToastProvider";

const requestTokenURL = `${baseUrl}/user/login/twitter`;
const accessTokenURL = `${baseUrl}/user/login/twitter/callback`;
const redirect = AuthSession.makeRedirectUri();
WebBrowser.maybeCompleteAuthSession();

export function useTwitterLogin() {
  const { token } = AuthStore.useState((s) => s);
  const [isLoading, setIsLoading] = useState(false);
  const { show } = useToast();

  const onLogin = useCallback(async () => {
    setIsLoading(true);

    try {
      const requestTokens = await axios.post(
        requestTokenURL,
        { callback_url: redirect },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const authResponse = (await AuthSession.startAsync({
        authUrl:
          "https://api.twitter.com/oauth/authenticate" +
          toQueryString(requestTokens?.data?.data),
        projectNameForProxy: "@owner/slug",
      })) as any;

      if (authResponse.params && authResponse.params.denied) {
        show({
          message: "You denied the request to sign in with Twitter",
          type: "error",
        });
        return;
      }

      if (!authResponse?.params?.oauth_verifier) {
        return;
      }

      const accessTokenBody = {
        oauth_token: requestTokens?.data?.data?.oauth_token,
        oauth_token_secret: requestTokens?.data?.data?.oauth_token_secret,
        oauth_verifier: authResponse?.params?.oauth_verifier,
      };

      return await axios
        .post(accessTokenURL, accessTokenBody, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          const response = data.data?.data;
          return response;
        })
        .catch((error) => {
          console.log(error.response?.data);
        });
    } catch (error: any) {
      throw new Error(error?.message || "Error while logging in with Twitter");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    onLogin,
    isLoading,
  };
}
