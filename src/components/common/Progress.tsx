import { View } from "react-native";
import { Text } from "./Text";

export function Progress({
  progress,
  total,
}: {
  progress: number;
  total: number;
}) {
  return (
    <View>
      <View className="flex justify-between items-center flex-row mb-2">
        <Text className="text-white text-xs" fontWeight="bold">
          {progress}km
        </Text>

        <Text className="text-white text-xs" fontWeight="bold">
          {total}km
        </Text>
      </View>

      <View
        className="w-full h-px relative overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        <View
          className="h-full absolute bg-white"
          style={{
            width: `${(progress / total) * 100}%`,
          }}
        />
      </View>
    </View>
  );
}
