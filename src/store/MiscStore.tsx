import { Store } from "pullstate";

export const MiscStore = new Store<{
  timer: number;
}>({
  timer: 3
});
