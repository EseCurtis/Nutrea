import { Store } from "pullstate";
import { Feed } from "../types/Feed";

export const FeedStore = new Store<{
  feed: Feed | null;
  feeds: Feed[];
  feedUserFollow: string[];
  unRepostedFeedIds: Feed["id"][];
}>({
  feed: null,
  feeds: [],
  feedUserFollow: [],
  unRepostedFeedIds: []
});
