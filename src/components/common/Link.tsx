import { Pressable, PressableProps } from "react-native";
import { Text } from "./Text";
import clsx from "clsx";

export function Link(
  props: PressableProps & {
    fontWeight?: "bold" | "normal" | "light" | "medium" | "extra-bold";
    underline?: boolean;
    children: React.ReactNode;
    labelClassName?: string;
  }
) {
  return (
    <Pressable {...props}>
      <Text
        className={clsx(
          "text-[#6E50F0] text-center",
          props.underline && "underline",
          props.labelClassName
        )}
        fontWeight={props.fontWeight ?? "bold"}
      >
        {props.children}
      </Text>
    </Pressable>
  );
}
