import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, PanResponder } from "react-native";
import Svg, { Line } from "react-native-svg";
import { Text } from "./Text";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

type Props = {
  value: number;
  setValue: (sliderValue: number) => void;
  label?: string;
  noGradient?: boolean;
  min?: number; // Minimum value for the slider
  max?: number; // Maximum value for the slider
};

export const Slider = ({
  value,
  setValue,
  label = "km",
  noGradient,
  min = 4,
  max = 50,
}: Props) => {
  const [sliderValue, setSliderValue] = useState<number>(value);
  const [lineHeights, setLineHeights] = useState<number[]>([]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {},
    onPanResponderMove: (_, gestureState) => {
      const width = numberOfLines * (lineSpacing + lineWidth);
      const newValue = sliderValue + (gestureState.dx * (max - min)) / width;
      // Ensure the value stays within the min and max range
      if (newValue >= min && newValue <= max) {
        setSliderValue(newValue);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      const width = numberOfLines * (lineSpacing + lineWidth);
      const newValue = sliderValue + (gestureState.dx * (max - min)) / width;
      // Ensure the value stays within the min and max range
      if (newValue >= min && newValue <= max) {
        setValue(Number(newValue.toFixed(2)));
      }
    },
  });

  const numberOfLines: number = 30;
  const lineSpacing: number = 10;
  const sliderHeight: number = 50;
  const lineWidth: number = 2;

  if (lineHeights.length === 0) {
    for (let i = 0; i < numberOfLines; i++) {
      const randomHeight = Math.random() * (sliderHeight - 20) + 20; // Random height within a range
      lineHeights.push(randomHeight);
    }
  }

  const lines: JSX.Element[] = [];
  for (let i = 0; i < numberOfLines; i++) {
    const x1: number = i * (lineSpacing + lineWidth);
    const y1: number = (sliderHeight - lineHeights[i]) / 2;
    const x2: number = x1;
    const y2: number = y1 + lineHeights[i];
    lines.push(
      <Line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#4B1BA9"
        strokeWidth={lineWidth}
        key={i}
      />
    );
  }

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex items-center justify-center h-[200px]">
      {/* {!noGradient && (
        <LinearGradient
          colors={
            isDark
              ? ["rgba(0,0,0,0)", "rgba(0,0,0,0)"]
              : ["rgba(255,255,255,1)", "rgba(255,255,255,0.1)"]
          }
          className="w-[100px] h-full absolute left-0 z-10"
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      )} */}

      <Svg
        width={numberOfLines * (lineSpacing + lineWidth)}
        height={sliderHeight}
      >
        {lines}
      </Svg>

      <View
        {...panResponder.panHandlers}
        style={{
          position: "absolute",
          left:
            (sliderValue * (numberOfLines * (lineSpacing + lineWidth))) /
            (max - min),
          width: 60,
          height: 100,
          zIndex: 20,
          alignItems: "center",
        }}
      >
        <Text
          fontWeight="medium"
          className="absolute text-center w-[150px] -top-8 text-6xl"
        >
          {sliderValue.toFixed(1)}
          <Text
            fontWeight="medium"
            className="text-center text-violet-900 dark:text-slate-200 text-base capitalize"
          >
            {" "}
            {label}
          </Text>
        </Text>
      </View>

      {/* {!noGradient && (
        <LinearGradient
          colors={
            isDark
              ? ["rgba(0,0,0,0)", "rgba(0,0,0,0)"]
              : ["rgba(255,255,255,1)", "rgba(255,255,255,0.1)"]
          }
          className="w-[100px] h-full absolute right-0 z-10"
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      )} */}
    </View>
  );
};
