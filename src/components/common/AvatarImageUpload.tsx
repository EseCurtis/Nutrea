import React from "react";
import { View } from "react-native";
import { IconButton } from "./IconButton";
import { Image } from "expo-image";
import { useUpload } from "../../hooks/api/useUpload";
import { Camera } from "../icons/Camera";
import clsx from "clsx";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export function AvatarImageUpload({
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

  const card = useThemeColor({}, "card");
  const cardTint = useThemeColor({}, "cardTint");

  return (
    <View className="relative w-[75px] h-[75px] items-center justify-center">
      <Image
        source={image}
        className={clsx(
          "w-[75px] h-[75px] rounded-full relative overflow-hidden",
          !image && "border border-[#4622D9] border-dashed"
        )}
        style={{ backgroundColor: card }}
      />
      <IconButton
        className="w-[30px] h-[30px] absolute"
        icon={<Camera size="18" />}
        loading={loading}
        onPress={() => uploadFile("library")}
      />
    </View>
  );
}
