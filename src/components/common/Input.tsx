import { useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextProps,
  View,
} from "react-native";
import { Text } from "./Text";
import { PasswordHide, PasswordShow } from "../icons/Password";
import { InfoError } from "../icons/Info";
import clsx from "clsx";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

export function Input(
  props: {
    style?: TextInput["props"]["style"];
    label?: string;
    labelStyle?: TextProps["style"];
    placeholder?: string;
    placeholderColor?: string;
    secureTextEntry?: boolean;
    right?: any;
    error?: any;
    disabled?: boolean;
    containerClassName?: string;
    onPress?: () => void;
    useBottomSheetKeyboard?: boolean;
  } & TextInputProps
) {
  const {
    style,
    label,
    labelStyle,
    placeholder,
    placeholderColor,
    secureTextEntry,
    right,
    containerClassName,
    onPress,
    useBottomSheetKeyboard,
    ...otherProps
  } = props;

  const TextInputComponent = props.useBottomSheetKeyboard
    ? BottomSheetTextInput
    : TextInput;

  const [active, setActive] = useState(false);
  const [showPassword, setShowPassword] = useState(secureTextEntry);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const cardTint = useThemeColor({}, "cardTint");

  return (
    <View
      className={clsx(
        "w-full flex flex-col gap-1 relative",
        containerClassName
      )}
    >
      {onPress && (
        <Pressable
          onPress={onPress}
          className="absolute top-0 bottom-0 left-0 right-0 z-10"
        />
      )}
      {label && (
        <Text className="text-base mb-[4px]" fontWeight="medium">
          {label}
        </Text>
      )}

      <View className="flex relative flex-row items-center">
        <TextInputComponent
          style={[
            {
              flex: 1,
              fontSize: 16,
              padding: 15,
              borderWidth: 1,
              borderColor: props.error
                ? "#EB5757"
                : active
                ? "#4B1BA9"
                : cardTint,
              borderRadius: 10,
              backgroundColor: "transparent",
              fontFamily: "GreycliffCFMedium",
              color: isDark ? "#fff" : "#000006",
            },
            style,
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor ?? isDark ? "#fff" : "#A4A4A4"}
          secureTextEntry={showPassword}
          onFocus={() => setActive(true)}
          editable={!props.disabled}
          {...otherProps}
          onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            setActive(false);
            props.onBlur && props.onBlur(e);
          }}
        />

        <View style={{ position: "absolute", right: 20 }}>
          {secureTextEntry ? (
            <Pressable
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <PasswordShow /> : <PasswordHide />}
            </Pressable>
          ) : right ? (
            right
          ) : null}
        </View>
      </View>

      {props.error && (
        <View className="flex flex-row items-center mt-4">
          <InfoError />

          <Text fontWeight="light" className="text-[#FB3F4A] text-[12px] ml-1">
            {props.error}
          </Text>
        </View>
      )}
    </View>
  );
}
