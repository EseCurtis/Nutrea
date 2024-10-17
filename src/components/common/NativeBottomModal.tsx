// import { Modal as DefaultModal, Pressable, View } from "react-native";
import { Text } from "./Text";
import clsx from "clsx";
import { PropsWithChildren, memo, useEffect } from "react";
import { BlurView } from "expo-blur";
import { ToastsContainer } from "./ToastsContainer";
import { Animated, Modal as DefaultModal, Pressable, View } from "react-native";
import { isIos } from "../../utils";
import { useThemeColor } from "@/src/hooks/useThemeColor";

type Props = {
  isOpen: boolean;
  title?: string;
  close?: (() => void) | ((GeneralClose?: () => void) => void);
  noWidth?: boolean;
  hideHeader?: boolean;
  noPadding?: boolean;
};

function BottomModalComponent({
  isOpen,
  close,
  title,
  children,
  noWidth,
  hideHeader,
  noPadding,
}: PropsWithChildren<Props>) {
  const animation = new Animated.Value(0);

  const background = useThemeColor({}, "background");

  const handleClose = () => {
    if (isIos && close) {
      Animated.spring(animation, {
        toValue: 0,
        // duration: 300,
        useNativeDriver: true,
      }).start();
      setTimeout(close, 200);
    }
  };

  useEffect(() => {
    if (isIos && isOpen) {
      setTimeout(() => {
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }, 100);
    }
  }, [isOpen]);

  return (
    <DefaultModal
      animationType="slide"
      // animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={handleClose}
    >
      <View
        className={clsx(
          "flex-1 flex-col items-center rounded-tr-3xl rounded-tl-3xl overflow-hidden relative",
          noWidth ? "" : "w-full"
        )}
        style={{ backgroundColor: background }}
      >
        <View
          className={clsx("flex-1 w-full", !noPadding ? "px-4" : "")}
          style={{ backgroundColor: background }}
        >
          {!hideHeader && (
            <View className="flex relative w-full items-center justify-center mb-6 py-2">
              <Text
                fontWeight="bold"
                className="text-center text-2xl leading-relaxed"
              >
                {title}
              </Text>
            </View>
          )}

          <View className="flex-1 w-full">{children}</View>
        </View>
      </View>
    </DefaultModal>
  );

  return (
    <DefaultModal
      animationType="slide"
      // animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={handleClose}
    >
      <BlurView
        className="flex-1 bg-white dark:bg-[#292F3F] flex items-center justify-end relative"
        style={{ backgroundColor: background }}
      >
        {close && (
          <Pressable
            className="absolute top-0 left-0 w-full h-full"
            onPress={handleClose}
          />
        )}

        <Animated.View
          className={clsx(
            "flex flex-col items-center rounded-tr-3xl rounded-tl-3xl overflow-hidden relative",
            noWidth ? "" : "w-full"
          )}
          // style={{
          //   transform: [
          //     {
          //       translateY: animation.interpolate({
          //         inputRange: [0, 1],
          //         outputRange: [window.height, 0],
          //       }),
          //     },
          //   ],
          // }}
        >
          <View
            className={clsx(
              "w-full bg-white dark:bg-[#292F3F] pt-8",
              !noPadding ? "p-6" : "pt-4"
            )}
          >
            {!hideHeader && (
              <View className="flex relative w-full items-center justify-center mb-6">
                <Text
                  fontWeight="bold"
                  className="text-center text-2xl leading-relaxed"
                >
                  {title}
                </Text>

                {/* {close && (
                  <Pressable onPress={close} className="absolute right-0">
                    <Close />
                  </Pressable>
                )} */}
              </View>
            )}

            <View className="w-full">{children}</View>
          </View>
        </Animated.View>
      </BlurView>

      <ToastsContainer />
    </DefaultModal>
  );
}

export const NativeBottomModal = memo(BottomModalComponent);
