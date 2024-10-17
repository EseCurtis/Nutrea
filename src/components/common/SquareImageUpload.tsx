import React from "react";
import { View } from "react-native";
import { IconButton } from "./IconButton";
import { ImageIcon } from "../icons/Image";
import { ImageBackground } from "expo-image";
import { useUpload } from "../../hooks/api/useUpload";
import clsx from "clsx";
import { Text } from "./Text";
import { InfoWarning } from "../icons/Info";

export function SquareImageUpload({
  setImage,
  image,
}: {
  setImage: (image: string) => void;
  image: string;
}) {
  const { uploadFile, loading } = useUpload({
    onDone: (url) => {
      setImage(url);
    },
  });

  return (
    <View className="items-center justify-center">
      <ImageBackground
        source={image}
        className={clsx(
          "w-[120px] h-[120px] bg-violet-50 rounded-lg overflow-hidden relative",
          !image && "border border-[#4622D9] border-dashed"
        )}
      >
        <View className="absolute right-4 top-4">
          <IconButton
            className="w-[30px] h-[30px]"
            icon={<ImageIcon size={18} />}
            loading={loading}
            onPress={() => uploadFile("library")}
          />
        </View>
      </ImageBackground>

      <View className="flex-row items-center">
        <InfoWarning />
        <Text className="text-xs">Image should be square sized</Text>
      </View>
    </View>
  );
}
