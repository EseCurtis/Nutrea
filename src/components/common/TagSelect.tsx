import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "./Text";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "../cards/Card";
import { InfoError } from "../icons/Info";

export function TagSelect({
  value,
  onChange,
  options,
  label,
  error,
  containerClassName,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
  error?: string;
  containerClassName?: string;
}) {
  return (
    <View className={clsx(containerClassName)}>
      <Text className="text-base mb-2">{label}</Text>

      <ScrollView
        contentContainerStyle={{ gap: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {options.map((option) => (
          <Pressable key={option} onPress={() => onChange(option)}>
            {value === option ? (
              <LinearGradient
                colors={["#4622D9", "#6E50F0"]}
                className="px-3 py-1 rounded-[20px]"
                start={[0, 0]}
                end={[1, 0]}
              >
                <Text className="text-sm capitalize text-white">{option}</Text>
              </LinearGradient>
            ) : (
              <Card className="px-3 py-1 rounded-[20px] m-0 shadow-none">
                <Text className="text-sm capitalize">{option}</Text>
              </Card>
            )}
          </Pressable>
        ))}
      </ScrollView>

      {error && (
        <View className="flex flex-row items-center mt-4">
          <InfoError />

          <Text fontWeight="light" className="text-[#FB3F4A] text-[12px] ml-2">
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}
