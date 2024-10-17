import { Store } from "pullstate";

export const ScrollerStore = new Store<{
  scrollAction: (() => void) | null;
}>({
  scrollAction: null
});
