import clsx from "clsx";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode, memo } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  TouchableOpacity,
} from "react-native";
import { Spinner } from "./Spinner";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

function FloatButtonComponent(
  props: {
    icon: ReactNode;
    iconSize?: number;
    iconColor?: string;
    loading?: boolean;
  } & TouchableOpacity["props"]
) {
  const { style, icon, iconSize, iconColor, ...otherProps } = props;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Pressable
      style={[
        {
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
      className={clsx(
        "shadow-xl w-8 h-8",
        isDark ? "bg-[#1C1D22]" : "bg-white",
        props.className
      )}
      activeOpacity={0.8}
      disabled={props.loading || props.disabled}
      {...otherProps}
    >
      <LinearGradient
        colors={["#4622D9", "#6E50F0"]}
        className="h-[67px] flex relative items-center justify-center rounded-full w-full"
        start={[0, 0]}
        end={[1, 0]}
      >
        {props.loading ? (
          <Spinner color={iconColor ?? isDark ? "white" : "black"} />
        ) : (
          icon
        )}
      </LinearGradient>
    </Pressable>
  );
}
export const FloatButton = memo(FloatButtonComponent);

export const IconButtonBordered = ({
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
        "w-12 h-12 flex items-center justify-center rounded-full bg-transparent dark:bg-[#25262D] border-gray-200 relative",
        !isDark && "border",
        props.className
      )}
    >
      {props.loading ? (
        <Spinner color={isDark ? "#fff" : "#4622D9"} />
      ) : (
        children
      )}
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Pressable
      {...props}
      disabled={props.loading || props.disabled}
      className="rounded-full overflow-hidden"
    >
      <BlurView
        className={clsx("w-14 h-14 items-center justify-center", props.class)}
      >
        <>
          {props.loading ? (
            <Spinner color={isDark ? "#fff" : "#4622D9"} />
          ) : (
            children
          )}
        </>
      </BlurView>
    </Pressable>
  );
};
