import { View } from "react-native";
import { Spinner } from "./Spinner";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

export function LoadingMore({ isLoading }: { isLoading: boolean }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {isLoading && <Spinner color={isDark ? "#fff" : "#541FBF"} />}
    </View>
  );
}
