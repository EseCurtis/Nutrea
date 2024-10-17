import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  View,
} from "react-native";
import { Text } from "./Text";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { isAndroid } from "@/src/utils";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

const TextInputJsx = isAndroid ? BottomSheetTextInput : TextInput;

export function PinInput(props: {
  style?: TextInput["props"]["style"];
  error?: any;
  value?: string;
  hidden?: boolean;
  onChange?: (value: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  autoFocus?: boolean;
}) {
  const { style, value, onChange, onBlur, autoFocus, ...otherProps } = props;
  const [active, setActive] = useState<number | null>(null);
  const pin = value?.split("") ?? [];
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const inputRef = React.useRef<TextInput>(null);
  const inputLength = 6;

  return (
    <View style={{ position: "relative" }}>
      <View className="flex justify-center flex-row">
        {new Array(inputLength).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: props.error
                  ? "#FB3F4A"
                  : active && active > index
                  ? "#7862E3"
                  : isDark
                  ? "#A0AEC0"
                  : "#CBD5E0",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Text
                style={{
                  fontSize: props.hidden ? 30 : 24,
                  marginTop: props.hidden ? 10 : 0,
                }}
                fontWeight="bold"
              >
                {props.hidden ? "*" : pin[index]}
              </Text>

              {active && active == index ? (
                <View
                  style={{
                    position: "absolute",
                    bottom: 10,
                    width: 24,
                    height: 1,
                    backgroundColor: "#7862E3",
                  }}
                />
              ) : null}
            </View>

            {index < inputLength - 1 && <View className="mx-[4px]" />}
          </React.Fragment>
        ))}

        <TextInputJsx
          style={{
            position: "absolute",
            height: 48,
            width: "100%",
            opacity: 0,
            textAlign: "center",
          }}
          value={value}
          onChangeText={(e) => {
            // update the value and hide keyboard after 4 characters
            if (e.length <= inputLength - 1) {
              onChange && onChange(e);
            } else {
              onChange && onChange(e);
              inputRef.current?.blur();
            }
          }}
          onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onBlur && onBlur(e);
            setActive(null);
          }}
          onFocus={() => {
            setActive(pin.length);
          }}
          autoComplete="sms-otp"
          keyboardType="number-pad"
          maxLength={inputLength}
          autoFocus={autoFocus}
          ref={inputRef}
        />
      </View>

      {props.error && (
        <>
          <Text
            style={{
              color: "#FB3F4A",
              fontSize: 14,
            }}
            fontWeight="light"
            className="text-center mt-1"
          >
            {props.error}
          </Text>
        </>
      )}
    </View>
  );
}
