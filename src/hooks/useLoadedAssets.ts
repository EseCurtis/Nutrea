import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { SplashScreen } from "expo-router";
import { useSession } from "../contexts/AuthContext";
import { useGetUser } from "./api/auth/useGetCurrentUser";
import { AuthStore } from "../store/AuthStore";
import { useStorage } from "./useStorage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function useLoadedAssets() {
  const { session, isLoading } = useSession();
  const [loadingTheme, setLoadingTheme] = useState(true);
  const { get } = useStorage();

  const { isLoading: isLoadingUser } = useGetUser({
    onSuccess: (e) => {
      AuthStore.update((s) => {
        s.user = e?.data;
        s.isLoggedIn = true;
        s.token = session as string;
      });
    },
  });

  useEffect(() => {
    const setColorSchemeDefault = async () => {
      const mode = await get("colorMode");
      AuthStore.update((s) => {
        s.themeMode = mode as any;
      });
      setLoadingTheme(false);
    };

    setColorSchemeDefault();
  }, []);

  const [loaded] = Font.useFonts({
    GreycliffCFBold: require("../assets/fonts/GreycliffCF-Bold.ttf"),
    GreycliffCFExtraBold: require("../assets/fonts/GreycliffCF-ExtraBold.ttf"),
    GreycliffCFLight: require("../assets/fonts/GreycliffCF-Light.ttf"),
    GreycliffCFMedium: require("../assets/fonts/GreycliffCF-Medium.ttf"),
    GreycliffCFRegular: require("../assets/fonts/GreycliffCF-Regular.ttf"),
    ...Ionicons.font,
  });

  const showLoader = isLoading || (session && isLoadingUser) || loadingTheme;

  useEffect(() => {
    if (!showLoader) {
      console.log("HHIDe");
      SplashScreen.hideAsync();
    }
  }, [showLoader]);

  return showLoader ? false : true;
}
