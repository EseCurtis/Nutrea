import { Modal as DefaultModal, Pressable, View } from "react-native";
import { Text } from "./Text";
import { Close } from "../icons/Close";
import { BlurView } from "expo-blur";
import clsx from "clsx";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

type Props = {
  isOpen: boolean;
  title?: string;
  close?: () => void;
  children: React.ReactNode;
  noWidth?: boolean;
  hideHeader?: boolean;
};

export function Modal({
  isOpen,
  close,
  title,
  children,
  noWidth,
  hideHeader,
}: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <DefaultModal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={close}
    >
      <BlurView
        intensity={20}
        className="flex-1 flex items-center justify-center p-6"
        style={{
          backgroundColor: isDark
            ? "rgba(255,255,255,0.1)"
            : "rgba(75, 27, 169, 0.12)",
        }}
      >
        <View
          className={clsx(
            "flex flex-col items-center rounded-[42px] p-4 bg-white dark:bg-[#191F2F] border border-slate-100 dark:border-0",
            noWidth ? "" : "w-full"
          )}
        >
          {!hideHeader && (
            <View className="flex relative w-full items-center justify-center mb-6 h-10">
              <Text fontWeight="bold" className="text-xl">
                {title}
              </Text>

              {close && (
                <Pressable onPress={close} className="absolute right-0">
                  <Close />
                </Pressable>
              )}
            </View>
          )}

          <View className="w-full">{children}</View>
        </View>
      </BlurView>
    </DefaultModal>
  );
}
