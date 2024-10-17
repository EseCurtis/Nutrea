import { MotiView, useDynamicAnimation } from "moti";
import React, { useRef, useState } from "react";
import { Pressable, Dimensions, Animated } from "react-native";
import { Card } from "../cards/Card";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "./Text";
import clsx from "clsx";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

interface TopBarProps {
  tabs: string[];
  onPress: (index: number) => void;
  tab?: number;
}

export const TopBar = ({ tabs, onPress, tab }: TopBarProps) => {
  const [activeTab, setActiveTab] = useState<number>(tab ?? 0);
  const windowWidth = Dimensions.get("window").width;
  const padding = 24;
  const tabWidth = (windowWidth - 2 * padding) / tabs.length;

  const animation = useDynamicAnimation(() => ({
    translateX: padding + tabWidth * activeTab,
  }));

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    onPress(index);
  };

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const indicatorTranslateX = useRef(new Animated.Value(0)).current;

  return (
    <Card className="mt-0 shadow-sm h-[30px] flex-row justify-between items-center p-[2px] dark:bg-[#171717] rounded-full">
      <MotiView
        style={{
          width: tabWidth,
          height: 30,
          position: "absolute",
          borderRadius: 100,
          marginLeft: -padding,
        }}
        from={{
          translateX: padding + tabWidth * activeTab,
        }}
        animate={{ translateX: padding + tabWidth * activeTab }}
        transition={{ type: "timing" }}
      >
        <LinearGradient
          colors={["#4622D9", "#6E50F0"]}
          className="h-[30px] rounded-full items-center justify-center"
          start={[0, 0]}
          end={[1, 0]}
          // style={[
          //   {
          //     width: tabWidth,
          //     transform: [
          //       {
          //         translateX: activeTab * tabWidth,
          //       },
          //     ],
          //     height: 30,
          //     position: "absolute",
          //     borderRadius: 100,
          //     // marginLeft: -padding,
          //   },
          // ]}
        />
      </MotiView>

      {/* <Animated.View
        style={[
          {
            width: tabWidth,
            transform: [{ translateX: indicatorTranslateX }],
            height: 30,
            position: "absolute",
            borderRadius: 100,
          },
        ]}
      >
        
      </Animated.View> */}

      {tabs?.map((tab, index) => (
        <Pressable
          key={index}
          style={{
            width: tabWidth,
          }}
          onPress={() => handleTabPress(index)}
        >
          <Text
            fontWeight="bold"
            className={clsx(
              activeTab === index ? "text-white" : isDark ? "#fff" : "black",
              "text-sm text-center"
            )}
          >
            {tab}
          </Text>
        </Pressable>
      ))}
    </Card>
  );
};
