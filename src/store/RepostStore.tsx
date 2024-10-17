import { Store } from "pullstate";
import { Video, VideoDetail } from "../utils/types/Course";
import { Feed } from "../types/Feed";

export const RepostStore = new Store<{
  repostedFeeds: Feed[];
}>({
  repostedFeeds: []
});
