import React from "react";
import { Pressable, View } from "react-native";
import { IconButton } from "./IconButton";
import { Text } from "./Text";
import { CheckIconActive, UnCheck } from "../icons/checkIcon";
import { Switch } from "./Switch";
import { Card } from "../cards/Card";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Colors } from "@/src/constant/colors";

export function CustomRadioSelect({
  options,
  value,
  setValue,
  values,
}: {
  options: {
    title: string;
    desc: string;
    icon: React.ReactNode;
    value: any;
    disabled?: boolean;
    type: "radio" | "checkbox" | "tap" | "add" | any;
    withFullIcon?: boolean;
    numberOfLines?: number;
  }[];
  value?: any;
  setValue: (value: any) => void;
  values?: any[];
}) {
  const card = useThemeColor({ light: "#fff" }, "card");
  const cardTint = useThemeColor({ light: "#fff" }, "cardTint");

  return (
    <View className="w-full flex-col gap-4 relative">
      {options.map((option, index) => (
        <Card
          style={{ backgroundColor: card }}
          key={index}
          className="mt-6 rounded-full shadow-xl w-full p-4"
        >
          <View className="items-center justify-between flex-row relative w-full">
            <View className="flex-row items-center">
              {option.withFullIcon ? (
                option.icon
              ) : (
                <IconButton
                  className="w-11 h-11 dark:border-0"
                  style={{ backgroundColor: cardTint }}
                  icon={option.icon}
                />
              )}
              <View className="ml-4">
                <Text className="text-base capitalize" fontWeight="bold">
                  {option?.title}
                </Text>

                <Text
                  numberOfLines={option?.numberOfLines || 1}
                  className="opacity-60 text-xs w-[170px]"
                >
                  {option?.desc}
                </Text>
              </View>
            </View>
            {!option.disabled && (
              <View>
                {option.type === "checkbox" ? (
                  <Switch
                    onValueChange={(val) => setValue(val)}
                    value={option.value}
                  />
                ) : option.type === "radio" ? (
                  <Pressable onPress={() => setValue(option.value)}>
                    {value === option.value ||
                    values?.includes(option.value) ? (
                      <CheckIconActive />
                    ) : (
                      <UnCheck />
                    )}
                  </Pressable>
                ) : option.type === "tap" ? (
                  <Pressable onPress={() => setValue(option.value)}>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={18}
                      color="#A0AEC0"
                      onPress={() => {
                        setValue(value + 1);
                      }}
                    />
                  </Pressable>
                ) : (
                  <View className="flex-row items-center">
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color="#A0AEC0"
                      onPress={() => {
                        if (value > 1) {
                          setValue(value - 1);
                        }
                      }}
                    />
                    <Text fontWeight="bold" className="text-2xl mx-2 -mt-1">
                      {value}
                    </Text>
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color="#A0AEC0"
                      onPress={() => {
                        setValue(value + 1);
                      }}
                    />
                  </View>
                )}
              </View>
            )}
          </View>

          {(option.type === "radio" || option.type === "tap") && (
            <Pressable
              onPress={() => setValue(option.value)}
              className="absolute inset-0 top-0 right-0 w-full h-[100px]"
              disabled={option.disabled}
            />
          )}
        </Card>
      ))}
    </View>
  );
}
