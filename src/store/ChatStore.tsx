import { Store } from "pullstate";
import { User } from "../types/User";
import { GroupChat } from "../types/GroupChat";

export const ChatStore = new Store<{
  reciever: User | null;
  groupChat: GroupChat | null;
}>({
  reciever: null,
  groupChat: null,
});
