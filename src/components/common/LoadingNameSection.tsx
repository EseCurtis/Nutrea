import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { memo } from "react";
import { View } from "react-native";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

function LoadingNameSectionComponent() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";
  const colorMode = dark ? "dark" : "light";

  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      animate={{ backgroundColor: "transparent" }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Skeleton
            colorMode={colorMode}
            radius="round"
            height={40}
            width={40}
          />
          <View className="ml-4">
            <Skeleton
              colorMode={colorMode}
              radius="square"
              height={15}
              width={100}
            />
            <View className="h-1" />
            <Skeleton
              colorMode={colorMode}
              radius="square"
              height={20}
              width={167}
            />
          </View>
        </View>

        <Skeleton colorMode={colorMode} radius="round" height={30} width={30} />
      </View>
    </MotiView>
  );
}

export const LoadingNameSection = memo(LoadingNameSectionComponent);
