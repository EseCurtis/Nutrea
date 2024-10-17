import { View } from "react-native";
import { Button } from "./Button";
import { User } from "@/src/types/User";
import { useFollowUnfollow } from "@/src/hooks/api/common/useFollowUnfollow";
import clsx from "clsx";
import { FeedStore } from "@/src/store/FeedStore";

type TFollowUnfollowButtonProps = {
  toBeFollowed: User;
  onFinish?: () => void;
  buttonClassName?: string;
  labelClassName?: string;
};

export function FollowUnfollowButton({
  toBeFollowed,
  onFinish,
}: TFollowUnfollowButtonProps) {
  const { feedUserFollow } = FeedStore.useState((s) => s);
  const checkId = feedUserFollow.includes(toBeFollowed?.id);

  const { isFollowing, isLoading, checking, handleFollowUnfollow } =
    useFollowUnfollow({
      userId: toBeFollowed?.id,
      isfollowed: !!checkId,
      onFollowDone: () => {
        onFinish && onFinish();
        FeedStore.update((s) => {
          s.feedUserFollow = s.feedUserFollow.includes(toBeFollowed?.id)
            ? s.feedUserFollow.filter((e) => e !== toBeFollowed?.id)
            : [...s.feedUserFollow, toBeFollowed?.id];
        });
      },
    });

  return (
    <Button
      fontWeight="bold"
      onPress={handleFollowUnfollow}
      disabled={checking}
      isLoading={isLoading}
      loadingIconSize={18}
      buttonClassName={clsx("h-8 rounded-full", isFollowing ? "w-20" : "w-16")}
      labelClassName="text-xs"
      mode="secondary"
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
