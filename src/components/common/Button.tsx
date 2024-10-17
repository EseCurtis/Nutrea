import { Pressable, PressableProps, TextProps, View } from "react-native";
import { Text } from "./Text";
import { PropsWithChildren } from "react";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { Spinner } from "./Spinner";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";
import { Colors } from "@/src/constant/colors";

export function Button(
  props: PropsWithChildren<
    PressableProps & {
      isLoading?: boolean;
      width?: number;
      mode?: "primary" | "secondary";
      fontWeight?: "bold" | "normal" | "light" | "medium" | "extra-bold";
      buttonClassName?: PressableProps["className"];
      labelClassName?: PressableProps["className"];
      transparent?: boolean;
      loadingIconSize?: number;
      labelStyles?: TextProps["style"];
    }
  >
) {
  const { mode = "primary", transparent, labelStyles } = props;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const card = useThemeColor({}, "card");
  const cardTint = useThemeColor({}, "cardTint");
  const buttonText = useThemeColor({ light: Colors.light.primary }, "text");
  const text = useThemeColor({}, "text");

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
            ? transparent
              ? ["#00000000", "#00000000"]
              : ["#4622D9", "#6E50F0"]
            : transparent
            ? ["#00000000", "#00000000"]
            : isDark
            ? [cardTint, cardTint]
            : ["rgba(70, 34, 217, 0.05)", "rgba(110, 80, 240, 0.05)"]
        }
        className={clsx(
          "flex relative items-center justify-center w-full rounded-lg h-14",
          props.buttonClassName
        )}
        start={[0, 0]}
        end={[1, 0]}
      >
        <View className="z-10 absolute">
          {props.isLoading ? (
            <Spinner
              color={mode === "primary" ? "white" : text}
              size={props?.loadingIconSize ?? 24}
            />
          ) : (
            <Text
              style={[
                {
                  color: mode === "primary" ? "white" : buttonText,
                },
                labelStyles,
              ]}
              className={clsx("text-base", props.labelClassName)}
              fontWeight={props.fontWeight ?? "bold"}
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
    loadingIconColor?: string;
  }
) {
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
        <Spinner color={props.loadingIconColor ?? "#6E50F0"} size={24} />
      ) : (
        <>
          {props.icon && <View>{props.icon}</View>}
          <Text
            fontWeight={props.fontWeight ?? "bold"}
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
