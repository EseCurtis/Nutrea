import { Image } from "react-native";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

export function Logo({
  size = 70,
  colorMode,
}: {
  size?: number;
  colorMode?: "dark" | "light";
}) {
  const colorScheme = colorMode ?? useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Image
      source={
        isDark
          ? require("../../assets/images/logo-white.png")
          : require("../../assets/images/logo.png")
      }
      style={{
        height: size,
        width: size,
        resizeMode: "contain",
      }}
    />
  );
}
