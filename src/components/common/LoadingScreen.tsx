import React from "react";
import { View } from "react-native";
import LoaderKit from "react-native-loader-kit";

export default function LoadingScreen() {
  return (
    <View>
      <LoaderKit
        style={{ width: 50, height: 50 }}
        name={""}
        color={"#4520D8"}
      />
    </View>
  );
}
