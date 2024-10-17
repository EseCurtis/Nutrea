import { useState } from "react";
import type { Animated } from "react-native";

export const useAnimateNavbar = (
  scroll: Animated.Value,
  imageHeight: number,
  headerHeight: number
) => {
  const [statusBar, setStatusBar] = useState("light");
  const HEADER_HEIGHT_DIFFERENCE = imageHeight - headerHeight;
  const headerOpacity = scroll.interpolate({
    inputRange: [0, HEADER_HEIGHT_DIFFERENCE * 0.75, HEADER_HEIGHT_DIFFERENCE],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });
  const overflowHeaderOpacity = scroll.interpolate({
    inputRange: [0, HEADER_HEIGHT_DIFFERENCE * 0.75, HEADER_HEIGHT_DIFFERENCE],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  // scroll.addListener(({ value }) => {
  //   if (value > HEADER_HEIGHT_DIFFERENCE * 0.75) {
  //     setStatusBarStyle("dark");
  //   } else {
  //     setStatusBarStyle("light");
  //   }
  // });

  return { headerOpacity, overflowHeaderOpacity, statusBar };
};
