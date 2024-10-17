import { Feed } from "@/src/types/Feed";

export function useFilterBlocked(feed: Feed[], blockedUserIds: string[]) {
  return (feed || []).filter(
    (feedItem) => !blockedUserIds?.includes(feedItem?.user_id)
  );
}


export function useFilterUnfollowed(feed: Feed[], unfollowedUsers: string[]) {
    return (feed || []).filter(
      (feedItem) => !unfollowedUsers?.includes(feedItem?.user_id)
    );
  }
  
