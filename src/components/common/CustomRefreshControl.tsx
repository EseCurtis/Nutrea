import { RefreshControl, RefreshControlProps } from "react-native";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

export function CustomRefreshControl(props: RefreshControlProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <RefreshControl
      {...props}
      tintColor={isDark ? "#fff" : "#4520D8"}
      title="Refresh"
      titleColor={isDark ? "#fff" : "#000"}
    />
  );
}
