import { Store } from "pullstate";

export const LikeStore = new Store<{
  feeds: {
    feed_id: string;
    likes: number;
    isLiked: boolean;
  }[];
  comments: {
    comment_id: string;
    likes: number;
    isLiked: boolean;
  }[];
}>({
  feeds: [],
  comments: [],
});
