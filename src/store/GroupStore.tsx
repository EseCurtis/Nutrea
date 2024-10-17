import { Store } from "pullstate";
import { Group } from "../types/Group";

export const GroupStore = new Store<{
  group: Group | null;
}>({
  group: null,
});
