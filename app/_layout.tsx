import "@/src/styles/global.css";

import { SafeAreaView, View } from "react-native";
import { Slot } from "expo-router";
import { Inter_900Black, useFonts } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ScrollView } from "@/src/components/common/ScrollView";
import { Navigator } from "@/src/components/layout/Navigator";

SplashScreen.preventAutoHideAsync();

const AppBaseLayout: React.FC = () => {
  const [loaded, error] = useFonts({
    Inter_900Black
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View className="bg-cement dark:bg-denim">
      <SafeAreaView>
        <View className="relative h-full">
          <ScrollView>
            <Slot />
          </ScrollView>
          <Navigator />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AppBaseLayout;
