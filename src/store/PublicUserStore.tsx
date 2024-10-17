import { Store } from "pullstate";
import { HiddenUser } from "../hooks/api/challenges/useGetChallenges";
import { User } from "./AuthStore";

export const PublicUserStore = new Store<{
  user: HiddenUser | User | null;
}>({
  user: null,
});
