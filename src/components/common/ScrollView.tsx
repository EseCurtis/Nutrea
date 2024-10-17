import React from "react";
import {
  ScrollViewProps,
  ScrollView as DefaultScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ScrollView(props: ScrollViewProps) {
  const { bottom } = useSafeAreaInsets();
  return (
    <DefaultScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        { paddingBottom: bottom },
        props.contentContainerStyle,
      ]}
    >
      {props.children}
    </DefaultScrollView>
  );
}
