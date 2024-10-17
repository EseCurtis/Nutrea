import { useNavigation } from "@react-navigation/native";
import { Notification } from "../types/Notification";
import { NotificationType } from "../enums/NotificationType";
import { useReadNotification } from "./api/dashboard/useReadNotification";
import { Alert } from "react-native";

export function useNotificationNavigation() {
  const navigation = useNavigation();
  const { mutate } = useReadNotification();

  const handleNotificationNavigation = (notification: Notification) => {
    if (notification.id) {
      mutate({ notification_id: notification.id });
    }

    if (
      notification?.type === NotificationType.FEED_LIKE ||
      notification.type === NotificationType.FEED ||
      notification.type === NotificationType.COMMENT ||
      notification.type === NotificationType.COMMENT_LIKE
    ) {
      // @ts-ignore
      navigation.navigate("OuterFeedDetailScreen", {
        feed_id: notification?.notable_id,
      });
    } else if (notification.type === NotificationType.MESSAGE) {
      // @ts-ignore
      navigation.navigate("ChatBoxScreen", {
        user_id: notification?.notable_id,
      });
    } else if (notification.type === NotificationType.GROUP_MESSAGE) {
      // @ts-ignore
      navigation.navigate("GroupChatScreen", {
        group_id: notification?.notable_id,
      });
    } else if (notification.type === NotificationType.FOLLOW) {
      // @ts-ignore
      navigation.navigate("PublicProfile", {
        user_id: notification?.notable_id,
      });
    } else {
      Alert.alert("Notification", notification?.message);
    }
  };

  return {
    handleNotificationNavigation,
  };
}
