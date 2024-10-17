import { Text as DefaultText, Platform, TextProps } from "react-native";
import React from "react";
import clsx from "clsx";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export function Text(
  props: TextProps & {
    fontWeight?: "bold" | "normal" | "light" | "medium" | "extra-bold";
  }
) {
  const { fontWeight } = props;
  const text = useThemeColor({}, "text");

  return (
    <DefaultText
      {...props}
      className={`${clsx(
        props.className ? props.className : "text-[14px]"
      )} text-black dark:text-white`}
      style={[
        {
          fontFamily: Platform.select({
            android: "Inter_900Black",
            ios: "Inter-Black"
          })
        },
        props.style
      ]}
    >
      {props.children}
    </DefaultText>
  );
}
