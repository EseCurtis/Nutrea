import { memo } from "react";
import { BarIndicator, MaterialIndicator } from "react-native-indicators";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

function SpinnerComponent({
  color,
  size = 20,
}: {
  color?: string;
  size?: number;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const defaultColors = color ? color : isDark ? "#fff" : "#4622D9";

  return <MaterialIndicator color={defaultColors} size={size} />;
}

export const Spinner = memo(SpinnerComponent);
