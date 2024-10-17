import { AuthStore } from "../store/AuthStore";
import { Feed } from "../types/Feed";
import { User } from "../types/User";
import { useGetUser } from "./api/dashboard/useGetUser";
import { useGetFeed } from "./api/feeds/useGetFeed";

export type TExtrapolatedRepostFeed = Feed & {
  user: User;
  isReposted: boolean;
  isYou: boolean;
};

const useRepostExtrapolate = ({ feed }: { feed: Feed }) => {
  const { user } = AuthStore.useState((s) => s);
  const isReposted = Boolean(feed?.original_post);
  let actualAuthor = feed.user;
  const { data: actualFeedInfo } = useGetFeed(feed?.original_post?.id as string);
  const originalFeed = actualFeedInfo && actualFeedInfo?.data;


  if (isReposted) {
    const { data, refetch } = useGetUser(
      feed?.original_post?.user_id as string
    );
    actualAuthor = data?.data;
  }

  return {
    extrapolatedFeed: {
      ...feed,
      ...originalFeed,
      user: actualAuthor,
      isReposted,
      isYou: user?.id == actualAuthor?.id,
      files: originalFeed?.files,
      originalFeed
    }
  };
};

export default useRepostExtrapolate;
