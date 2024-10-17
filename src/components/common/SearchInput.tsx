import React, { memo } from "react";
import { Pressable, TextInput, View } from "react-native";
import clsx from "clsx";
import { Search } from "../icons/Search";
import Svg, { Path } from "react-native-svg";
import { Spinner } from "./Spinner";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

function SearchInputComponent(
  props: TextInput["props"] & {
    leftIcon?: React.ReactNode;
    onPress?: () => void;
    rightIcon?: React.ReactNode;
    hideSearchIcon?: boolean;
    containerClassName?: View["props"]["className"];
    isLoading?: boolean;
    hideClearIcon?: boolean;
    inputRef?: React.RefObject<TextInput>;
  }
) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const cardTint = useThemeColor({}, "cardTint");

  return (
    <View
      className={clsx(
        "w-full overflow-hidden rounded-full border flex items-center flex-row h-[40px]",
        props.containerClassName
      )}
      style={{ borderColor: cardTint }}
    >
      {!props.hideSearchIcon && (
        <View className="absolute left-[10px]">
          {props.leftIcon ?? <Search />}
        </View>
      )}

      <TextInput
        {...props}
        className={clsx(
          "w-full p-[5px] pt-[5px] text-black",
          !props.hideSearchIcon && "pl-[40px]"
        )}
        placeholderTextColor={"#A0AEC0"}
        style={[
          {
            color: isDark ? "#fff" : "#000",
          },
          props.style,
        ]}
        ref={props.inputRef}
      />

      {props.value && props?.value?.length > 0 && !props.hideClearIcon ? (
        <Pressable
          onPress={() => props.onChangeText && props?.onChangeText("")}
          className="w-6 h-6 bg-violet-100 rounded-3xl absolute right-4 z-50 justify-center items-center flex"
        >
          <Svg width="15" height="16" viewBox="0 0 15 16" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.38306 5.25607C5.13788 5.06542 4.78336 5.08276 4.55806 5.30806C4.31398 5.55214 4.31398 5.94786 4.55806 6.19194L6.61612 8.25L4.55806 10.3081L4.50607 10.3669C4.31542 10.6121 4.33276 10.9666 4.55806 11.1919C4.80214 11.436 5.19786 11.436 5.44194 11.1919L7.5 9.13388L9.55806 11.1919L9.61694 11.2439C9.86212 11.4346 10.2166 11.4172 10.4419 11.1919C10.686 10.9479 10.686 10.5521 10.4419 10.3081L8.38388 8.25L10.4419 6.19194L10.4939 6.13306C10.6846 5.88788 10.6672 5.53336 10.4419 5.30806C10.1979 5.06398 9.80214 5.06398 9.55806 5.30806L7.5 7.36612L5.44194 5.30806L5.38306 5.25607Z"
              fill="#040415"
            />
          </Svg>
        </Pressable>
      ) : props.rightIcon ? (
        <View className="absolute right-0 z-50">{props.rightIcon}</View>
      ) : (
        props.isLoading && (
          <View className="absolute right-0 z-50">
            <Spinner />
          </View>
        )
      )}

      {props.onPress && (
        <Pressable
          onPress={props.onPress}
          className="absolute w-[90%] h-full"
        />
      )}
    </View>
  );
}

export const SearchInput = memo(SearchInputComponent);
