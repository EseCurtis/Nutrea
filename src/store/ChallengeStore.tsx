import { Store } from "pullstate";
import { Challenge } from "../types/Challenge";

export const ChallengeStore = new Store<{
  challenge: Challenge | null;
}>({
  challenge: null,
});
