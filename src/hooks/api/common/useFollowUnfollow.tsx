import { useEffect, useState } from "react";
import { useTQuery } from "../useTQuery";
import { useTMutation } from "../useTMutation";

export function useFollowUnfollow({
  userId,
  isfollowed,
  onFollowDone,
}: {
  userId: any;
  isfollowed?: boolean;
  onFollowDone?: (...params: any) => void;
}) {
  const [isFollowing, setIsFollowing] = useState(isfollowed ?? false);

  useEffect(() => {
    if (isfollowed) {
      setIsFollowing(isfollowed);
    }
  }, [isfollowed]);

  const { isLoading: checking } = useTQuery({
    queryKey: ["checkFollower", `${userId}`],
    url: `/follow/check/${userId}`,
    enabled: true,
    options: {
      onSuccess: (data) => {
        setIsFollowing(data.data);
      },
    },
    silent: true,
  });

  const { mutate, isLoading } = useTMutation({
    url: "follow/follow-or-unfollow",
    options: {
      onSuccess: (resp) => {
        onFollowDone && onFollowDone(resp);
      },
    },
  });

  const handleFollowUnfollow = () => {
    setIsFollowing(!isFollowing);
    mutate({
      follow_id: userId,
    });
  };

  return {
    checking,
    isFollowing,
    handleFollowUnfollow,
    isLoading: isLoading,
  };
}
