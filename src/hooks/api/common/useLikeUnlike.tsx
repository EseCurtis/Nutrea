import { useCallback } from "react";
import { useTMutation } from "../useTMutation";
import { LikeType } from "../../../types/Like";
import { useTQuery } from "../useTQuery";
import { LikeStore } from "../../../store/LikeStore";

export function useLikeUnlike({
  feed_id,
  comment_id,
  type,
  likes,
}: {
  feed_id?: string;
  comment_id?: string;
  type: LikeType;
  likes: number;
}) {
  const { isLoading } = useTQuery({
    url: `/like/check?type=${type}${feed_id ? `&feed_id=${feed_id}` : ""}${
      comment_id ? `&comment_id=${comment_id}` : ""
    }`,
    queryKey: ["likes", feed_id || "", comment_id || "", type],
    options: {
      enabled: !!feed_id || !!comment_id,
      onSuccess: (data) => {
        LikeStore.update((s) => {
          if (type === LikeType.FEED) {
            const feed = s.feeds.find((f) => f.feed_id === feed_id);
            if (!feed) {
              s.feeds.push({
                feed_id: feed_id!,
                isLiked: !!data?.data,
                likes,
              });
            }
          } else if (type === LikeType.COMMENT) {
            const comment = s.comments.find((c) => c.comment_id === comment_id);
            if (!comment) {
              s.comments.push({
                comment_id: comment_id!,
                isLiked: !!data?.data,
                likes,
              });
            }
          }
        });
      },
    },
  });

  const { mutate, isLoading: isLiking } = useTMutation({
    method: "post",
    url: "/like/like-unlike",
  });

  const handleLikeUnlike = useCallback(() => {
    if (!feed_id && !comment_id) return;

    LikeStore.update((s) => {
      if (type === LikeType.FEED) {
        const feed = s.feeds.find((f) => f.feed_id === feed_id);
        if (feed) {
          feed.isLiked = !feed.isLiked;
          feed.likes = feed.isLiked ? feed.likes + 1 : feed.likes - 1;
        }
      } else if (type === LikeType.COMMENT) {
        const comment = s.comments.find((c) => c.comment_id === comment_id);
        if (comment) {
          comment.isLiked = !comment.isLiked;
          comment.likes = comment.isLiked
            ? comment.likes + 1
            : comment.likes - 1;
        }
      }
    });

    mutate({
      feed_id,
      comment_id,
      type,
    });
  }, [feed_id, comment_id, type]);

  return {
    isLoading: isLoading || isLiking,
    handleLikeUnlike,
  };
}
