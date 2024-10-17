import { Store } from "pullstate";
import { User } from "../types/User";

export const BlockStore = new Store<{
  blockedUserIds: User["id"][];
  unfollowedUserIds: User["id"][];
}>({
  blockedUserIds: [],
  unfollowedUserIds: []
});
