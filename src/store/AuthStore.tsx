import { Store } from "pullstate";
import { User } from "../types/User";

export const AuthStore = new Store<{
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
  loggedOut: boolean;
  authPage:
    | "login"
    | "create-account"
    | "forgot-password"
    | "create-password"
    | "follow-popular-users"
    | "password-reset-success"
    | "setup-account-info"
    | "setup-age"
    | "setup-avatar"
    | "setup-gender"
    | "setup-health"
    | "setup-height"
    | "setup-name"
    | "setup-notification"
    | "setup-referral"
    | "setup-weight"
    | "signup-success"
    | "verify-email"
    | "setup-wallet"
    | "loading"
    | null;
  themeMode: "light" | "dark" | "system";
}>({
  isLoggedIn: false,
  token: "",
  user: null,
  loggedOut: false,
  authPage: null,
  themeMode: "light",
});
