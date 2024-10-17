import clsx from "clsx";
import { BlurView } from "expo-blur";
import { ReactNode } from "react";
import { Pressable, PressableProps, TouchableOpacity } from "react-native";
import { Spinner } from "./Spinner";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

export function IconButton(
  props: {
    icon: ReactNode;
    iconSize?: number;
    iconColor?: string;
    loading?: boolean;
  } & TouchableOpacity["props"]
) {
  const { style, icon, iconSize, iconColor, ...otherProps } = props;
  const iconButtonBg = useThemeColor({ light: "#fff" }, "card");

  return (
    <Pressable
      style={[{ backgroundColor: iconButtonBg }, style]}
      className={clsx(
        "w-12 h-12 shadow-xl rounded-full items-center justify-center",
        props.className
      )}
      activeOpacity={0.8}
      disabled={props.loading || props.disabled}
      {...otherProps}
    >
      {props.loading ? <Spinner size={14} /> : icon}
    </Pressable>
  );
}

export const IconButtonBordered = ({
  children,
  ...props
}: PressableProps & {
  loading?: boolean;
}) => {
  const card = useThemeColor({}, "cardTint");

  return (
    <Pressable
      {...props}
      disabled={props.loading || props.disabled}
      // @ts-ignore
      style={[props.style, { borderColor: card }]}
      className={clsx(
        "w-12 h-12 flex items-center justify-center rounded-full shadow-xl border-[1px] relative",
        // !isDark && "border",
        props.className
      )}
    >
      {props.loading ? <Spinner /> : children}
    </Pressable>
  );
};

export const IconButtonBlur = ({
  children,
  ...props
}: PressableProps & {
  loading?: boolean;
  class?: PressableProps["className"];
}) => {
  return (
    <Pressable
      {...props}
      disabled={props.loading || props.disabled}
      className="rounded-full overflow-hidden"
    >
      <BlurView
        className={clsx("w-12 h-12 items-center justify-center", props.class)}
      >
        <>{props.loading ? <Spinner /> : children}</>
      </BlurView>
    </Pressable>
  );
};

export const IconButtonWithCheck = ({
  children,
  ...props
}: PressableProps & {
  loading?: boolean;
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Pressable
      {...props}
      disabled={props.loading || props.disabled}
      className={clsx(
        "w-12 h-12 flex items-center justify-center rounded-full bg-transparent dark:bg-[#27AE60] border-gray-200 relative",
        !isDark && "border",
        props.className
      )}
      style={props.style}
    >
      {props.loading ? <Spinner /> : children}
    </Pressable>
  );
};
