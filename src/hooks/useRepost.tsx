import { useToast } from "../contexts/ToastProvider";
import { Feed } from "../types/Feed";
import { useCreateFeed } from "./api/feeds/useCreateFeed";
import { useDeleteFeed } from "./api/feeds/useDeleteFeed";

type TuseRepostArgs = {
  onRepost: (wasUnReposted: boolean) => void;
  original_post_id: string;
  feed: Feed;
};

const useRepost = ({ onRepost, original_post_id, feed }: TuseRepostArgs) => {
  const { show } = useToast();
  const { mutate, isLoading } = useCreateFeed({
    onSuccess: () => {
      onRepost && onRepost(false);
      show({
        message: "Reposted",
        type: "success"
      });
    }
  });

  const { isLoading: deleteLoading, mutate: deleteFeed } = useDeleteFeed(
    feed?.id.toString(),
    {
      onSuccess: () => {
        show({ type: "success", message: "Post deleted successfully" });
        onRepost && onRepost(true);
      }
    }
  );

  const repostData = {
    content: feed?.content,
    files: [],
    group_id: feed?.group_id,
    workout_info: feed?.workout_info,
    is_share_group: feed?.is_share_group,
    original_post_id: feed?.id
  };

  const repost = (isReposted: boolean) => {
    (!isReposted && mutate(repostData)) || deleteFeed({});
  };

  return {
    repost,
    isLoading,
    deleteLoading
  };
};

export default useRepost;
