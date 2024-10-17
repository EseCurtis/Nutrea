import { usePaginatedQuery } from "../usePaginatedQuery";
import { UseQueryOptions } from "@tanstack/react-query";
import { ChallengeType } from "../../../enums/ChallengeType";
import { RewardModes } from "../../../enums/RewardModes";

export function useGetChallenges<T = any>({
  type,
  options,
  reward_mode,
  user_id,
  group_id,
  ended,
  group_chat_id,
}: {
  options?: UseQueryOptions<any, any, any, string[]>;
  type?: ChallengeType;
  reward_mode?: RewardModes;
  user_id?: string;
  group_id?: string;
  ended?: boolean;
  group_chat_id?: string;
}) {
  return usePaginatedQuery<T>({
    queryKey: [
      "challenges",
      type || "",
      reward_mode || "",
      user_id || "",
      group_id || "",
      ended ? "ended" : "",
      group_chat_id || "",
    ],
    url: `/challenge${ended ? "/ended" : ""}${
      type ? `?type=${type}` : reward_mode ? "?reward_mode=" + reward_mode : ""
    }${user_id ? `?user_id=${user_id}` : ""}${
      group_id ? `?group_id=${group_id}` : ""
    }${group_chat_id ? `?group_chat_id=${group_chat_id}` : ""}`,
    options,
    enabled: options?.enabled,
    silent: true,
  });
}
