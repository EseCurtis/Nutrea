import { View } from "react-native";
import { Text } from "./Text";

export function ModalHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <View className="my-6">
      <Text className="text-center text-[26px]" fontWeight="bold">
        {title}
      </Text>
      {description && (
        <Text className="text-center mt-2 opacity-70 text-base w-[300px] mx-auto">
          {description}
        </Text>
      )}
    </View>
  );
}
