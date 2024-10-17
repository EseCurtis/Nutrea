import { Store } from "pullstate";

export const LocationStore = new Store<{
  latitude: number | null;
  longitude: number | null;
}>({
  latitude: null,
  longitude: null,
});
