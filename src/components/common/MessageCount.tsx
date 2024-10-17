import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  View,
} from "react-native";
import { Text } from "./Text";
import { PropsWithChildren } from "react";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { Spinner } from "./Spinner";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

export function MessageCount(
  props: PropsWithChildren<
    PressableProps & {
      isLoading?: boolean;
      width?: number;
      mode?: "primary" | "secondary";
    }
  >
) {
  const { mode = "primary" } = props;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Pressable
      {...props}
      disabled={props.isLoading || props.disabled}
      style={[
        {
          opacity: props.isLoading || props.disabled ? 0.7 : 1,
        },
        // @ts-ignore
        props.style,
      ]}
    >
      <LinearGradient
        colors={
          mode === "primary"
            ? ["#4622D9", "#6E50F0"]
            : isDark
            ? ["#292F3F", "#292F3F"]
            : ["#EDF2F7", "#EDF2F7"]
        }
        className="h-[30px] w-[30px] flex relative items-center justify-center rounded-full "
        start={[0, 0]}
        end={[1, 0]}
      >
        <View className="z-10 absolute">
          {props.isLoading ? (
            <Spinner color={mode === "primary" ? "white" : "#333"} size={24} />
          ) : (
            <Text
              fontWeight="bold"
              className={clsx(
                "text-[16px]",
                mode === "primary"
                  ? "text-white"
                  : "text-[#333] dark:text-white"
              )}
            >
              {props.children}
            </Text>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export function OutlineButton(
  props: PressableProps & {
    children: JSX.Element | JSX.Element[] | string;
    isLoading?: boolean;
    icon?: JSX.Element;
    labelClassName?: string;
    widthDisable?: boolean;
    fontWeight?: "bold" | "normal" | "light" | "medium" | "extra-bold";
  }
) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Pressable
      {...props}
      className={
        props.widthDisable
          ? "h-[45px] flex-row relative items-center justify-center rounded-lg  border border-primary px-6"
          : "h-[45px] flex-row relative items-center justify-center rounded-lg w-full border border-primary px-6"
      }
      disabled={props.isLoading || props.disabled}
    >
      {props.isLoading ? (
        <Spinner color={isDark ? "white" : "#4622D9"} size={24} />
      ) : (
        <>
          {props.icon && <View>{props.icon}</View>}
          <Text
            fontWeight={props.fontWeight ?? "medium"}
            className={clsx(
              "text-[16px] ml-2 text-primary",
              props.labelClassName
            )}
          >
            {props.children}
          </Text>
        </>
      )}
    </Pressable>
  );
}
