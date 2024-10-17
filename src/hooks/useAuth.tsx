import { AuthStore } from "../store/AuthStore";
import { useStorage } from "./useStorage";
import { User } from "../types/User";
import { useState } from "react";
import { useSession } from "../contexts/AuthContext";

export const tokenKey = "token-uibibiwedfqwewefwergrwegweffegiub2ruibiubbi";
export const magicTokenKey = "magic-token";

export function useAuth() {
  const { get, remove, save } = useStorage();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { signIn: sign } = useSession();

  const signOut = async () => {
    setIsLoggingOut(true);
    await remove(tokenKey);

    AuthStore.update((s) => {
      s.isLoggedIn = false;
      s.token = null;
      s.loggedOut = true;
    });
    setIsLoggingOut(false);
  };

  const getToken = async () => {
    const token = await get(tokenKey);
    if (token) {
      AuthStore.update((s) => {
        s.token = token;
      });
    }

    return token;
  };

  const signIn = async ({
    user,
    token,
    isLoggedIn = false,
    magicToken,
  }: {
    token: string;
    user: User;
    isLoggedIn?: boolean;
    magicToken?: string;
  }) => {
    await save(tokenKey, token);
    if (magicToken) {
      await save(magicTokenKey, magicToken);
    }

    sign(token);

    AuthStore.update((s) => {
      s.token = token;
      s.user = user;
      s.isLoggedIn = isLoggedIn;
    });
  };

  return {
    signOut,
    getToken: getToken,
    token: AuthStore.useState((s) => s.token),
    signIn,
    isLoggingOut,
  };
}
