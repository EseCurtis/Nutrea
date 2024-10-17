import React from "react";
import { Animated, Pressable, View } from "react-native";
import { Text } from "../Text";
import { window } from "../../../constant";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

import { Card } from "../../cards/Card";

const AnimatedText = Animated.createAnimatedComponent(Text);

export function CustomTabBar({
  translateX,
  activeTab,
  handleTabChange,
  tabs,
}: {
  activeTab: number;
  handleTabChange: (tabIndex: number) => void;
  translateX: Animated.Value;
  tabs: string[];
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="px-4">
      <Card className="flex-row items-center h-[30px] rounded-full m-0 p-0 border-none">
        {tabs?.map((tab, index) => (
          <Pressable
            onPress={() => handleTabChange(index)}
            className="items-center justify-center h-full z-10"
            key={index}
            style={{
              width: window.width / tabs.length - 12,
            }}
          >
            <Text
              style={{
                color: activeTab === index ? "#fff" : isDark ? "#fff" : "#000",
              }}
              fontWeight="bold"
            >
              {tab}
            </Text>
          </Pressable>
        ))}
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              height: 30,
              backgroundColor: "#4622D9",
              width: window.width / tabs.length - 12,
              marginLeft: 0,
              borderRadius: 100,
            },
            {
              transform: [
                {
                  translateX: translateX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, window.width / tabs.length - 12],
                  }),
                },
              ],
            },
          ]}
        />
      </Card>
    </View>
  );
}
