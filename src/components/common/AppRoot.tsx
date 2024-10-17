import "react-native-gesture-handler";

import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";

import { SocketProvider } from "../../contexts/SocketContext";
import { Navigation } from "../../navigation";
import { useLoadedAssets } from "../../hooks/useLoadedAssets";
import { ToastsContainer } from "./ToastsContainer";
import { AuthScreenProvider } from "../../contexts/AuthScreensContext";
import { MagicProvider } from "../../contexts/MagicContext";
import { WorkoutProvider } from "../../contexts/WorkoutContext";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function AppRoot() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <WorkoutProvider>
          <AuthScreenProvider>
            <SocketProvider>
              {/* <BottomSheetModalProvider> */}
              {/* <StatusBar hidden={false} style={isDark ? "light" : "dark"} /> */}
              <Navigation />
              {/* </BottomSheetModalProvider> */}

              <ToastsContainer />
            </SocketProvider>
          </AuthScreenProvider>
        </WorkoutProvider>
      </SafeAreaProvider>
    );
  }
}
