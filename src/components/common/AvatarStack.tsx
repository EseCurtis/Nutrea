import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface AvatarStackProps {
  images: string[];
  avatarSize: number;
}

const AvatarStack: React.FC<AvatarStackProps> = ({ images, avatarSize }) => {
  return (
    <View
      style={[
        styles.avatarStack,
        {
          height: avatarSize,
        },
      ]}
    >
      {images?.map((image, index) => (
        <View
          key={index}
          style={[
            styles.avatarContainer,
            {
              width: avatarSize,
              height: avatarSize,
              marginLeft: index === 0 ? 0 : -avatarSize / 1.2,
            },
          ]}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: avatarSize / 2,
              borderWidth: 1,
              borderColor: "#212121",
            }}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 8,
    overflow: "hidden",
  },
});

export default AvatarStack;
