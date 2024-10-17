import React from "react";
import { View } from "react-native";
import { IconButton } from "./IconButton";
import { ImageIcon } from "../icons/Image";
import { ImageBackground } from "expo-image";
import { useUpload } from "../../hooks/api/useUpload";
import clsx from "clsx";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Colors } from "@/src/constant/colors";

export function WideImageUpload({
  setImage,
  image,
  containerStyle,
}: {
  setImage: (image: string) => void;
  image: string;
  containerStyle?: ImageBackground["props"]["style"];
}) {
  const { uploadFile, loading } = useUpload({
    onDone: (url) => {
      setImage(url);
    },
  });

  const card = useThemeColor({}, "card");
  const cardTint = useThemeColor({}, "cardTint");

  return (
    <ImageBackground
      source={image}
      className={clsx(
        "w-full h-[140px] rounded-lg overflow-hidden relative",
        !image && "border border-[#4622D9] border-dashed"
      )}
      style={[{ backgroundColor: card }, containerStyle]}
    >
      <View className="absolute right-4 top-4">
        <IconButton
          className="w-[30px] h-[30px]"
          icon={<ImageIcon size={18} color={Colors.dark.primary} />}
          loading={loading}
          onPress={() => uploadFile("library")}
          style={{ backgroundColor: cardTint }}
        />
      </View>
    </ImageBackground>
  );
}
