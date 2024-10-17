import { Store } from "pullstate";
import { Video, VideoDetail } from "../utils/types/Course";

export const VideoStore = new Store<{
  video: Video | null;
  videoDetail: VideoDetail | null;
  banner: string | null;
}>({
  video: null,
  videoDetail: null,
  banner: null,
});
