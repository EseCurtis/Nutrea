import React from "react";
import { View } from "react-native";
import { Animated } from "react-native";
import { window } from "../../../constant";

export function CustomTabView({
  translateX,
  activeTab,
  views,
  tabs,
}: {
  translateX: Animated.Value;
  activeTab: number;
  views: React.ReactNode[];
  tabs: string[];
}) {
  return (
    <View className="flex-row">
      {views.map((view, index) => (
        <Animated.View
          key={index}
          style={{
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -window.width],
                }),
              },
            ],
            width: window.width,
          }}
        >
          {view}
        </Animated.View>
      ))}
    </View>
  );
}
