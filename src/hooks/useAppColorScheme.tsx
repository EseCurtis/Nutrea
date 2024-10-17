import { useColorScheme as useAppColorScheme } from "react-native";
import { AuthStore } from "../store/AuthStore";

export function useColorScheme() {
  const colorScheme = useAppColorScheme();
  const { themeMode } = AuthStore.useState((s) => s);

  return themeMode === "system" ? colorScheme : themeMode;
}
