interface Response {
  statusCode: number;
}

interface Store {
  blockedUserIds: string[];
  [key: string]: any;
}

type ShowFunction = ({
  message,
  type
}: {
  message: string;
  type: "error" | "success" | "info";
}) => void;

interface Feed {
  user?: { username: string };
}

export default function updateBlockState(
  activeUserId: string | undefined,
  targetUserId: string | undefined,
  resp: Response,
  blockedUserIds: string[],
  BlockStore: { update: (fn: (s: Store) => void) => void },
  show: ShowFunction,
  feed?: Feed,
  storeStateProperty: keyof Store = "blockedUserIds",
  scope: string = "Blocked"
): any {
  if (targetUserId) {
    if (activeUserId == targetUserId) return 0;

    const wasBlocked = blockedUserIds.includes(targetUserId as any);
    const blockUnblockActionWasSuccessful = Number(resp?.statusCode) === 200;

    if (wasBlocked && blockUnblockActionWasSuccessful) {
      BlockStore.update((s) => {
        s[storeStateProperty] = blockedUserIds.filter(
          (blockedUserId) => blockedUserId !== targetUserId
        );
      });
    } else {
      const targetUserUsername = feed?.user?.username || "User";
      BlockStore.update((s) => {
        s[storeStateProperty] = [...s[storeStateProperty], targetUserId];
      });
      show({
        //@ts-ignore
        message: `${scope} ` + targetUserUsername,
        type: "info"
      });
    }

    if (!blockUnblockActionWasSuccessful) {
      show({
        message: "Error occurred while blocking user",
        type: "error"
      });
    }
  }
}
