import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";
import { window } from "../../constant";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

export function FeedLoading() {
  const colorScheme = useColorScheme();

  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      animate={{ backgroundColor: "transparent" }}
    >
      <View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Skeleton
              colorMode={colorScheme!}
              radius="round"
              height={40}
              width={40}
            />
            <View className="ml-4">
              <Skeleton
                colorMode={colorScheme!}
                radius="square"
                height={15}
                width={100}
              />
              <View className="h-1" />
              <Skeleton
                colorMode={colorScheme!}
                radius="square"
                height={12}
                width={167}
              />
            </View>
          </View>
        </View>

        <View className="mt-4 rounded-xl overflow-hidden">
          <Skeleton
            colorMode={colorScheme!}
            radius="square"
            height={200}
            width={window.width - 32}
          />
        </View>
      </View>
    </MotiView>
  );
}
