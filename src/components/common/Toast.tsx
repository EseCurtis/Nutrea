import React, { useEffect } from "react";
import { View, PanResponder, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, useDynamicAnimation } from "moti";
import { Text } from "./Text";
import { useToast } from "../../contexts/ToastProvider";
import { LinearGradient } from "expo-linear-gradient";

export function Toast({
  message,
  type,
  index,
  id,
}: {
  message: string;
  type: "error" | "success" | "info";
  index: number;
  id: number;
}) {
  const { toastsToRemove, removeToast } = useToast();
  const animation = useDynamicAnimation(() => ({
    height: 60,
    opacity: 1,
  }));

  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
        },
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 50 || gesture.dx < -50) {
        removeToast(id);
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  useEffect(() => {
    if (toastsToRemove.find((toast) => toast.id === id)) {
      setTimeout(() => {
        animation.animateTo({
          height: 0,
          opacity: 0,
        });

        setTimeout(() => {
          removeToast(id);
        }, 1000);
      }, 1000);
    }
  }, [toastsToRemove]);

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }],
      }}
      {...panResponder.panHandlers}
    >
      <MotiView
        from={{
          height: 0,
          opacity: 0,
        }}
        state={animation}
        transition={{ type: "timing" }}
        className="w-full px-6"
      >
        <View className="w-full relative rounded-lg overflow-hidden">
          <LinearGradient
            colors={["#6E50F0", "#7862E3"]}
            className="flex flex-row items-center justify-between p-4"
          >
            <View className="flex flex-row items-center">
              <Ionicons
                name={
                  type === "info"
                    ? "information-circle-outline"
                    : type === "error"
                    ? "close-circle-outline"
                    : "checkmark-circle-outline"
                }
                size={18}
                color="white"
              />
              <Text
                fontWeight="medium"
                className="text-white text-base ml-2 w-[90%]"
                numberOfLines={2}
              >
                {message}
              </Text>
            </View>
          </LinearGradient>
        </View>
      </MotiView>
    </Animated.View>
  );
}
