import _navigation from "@/src/constant/navigation";
import React from "react";
import { View } from "react-native";
import { Text } from "../common/Text";
type TNavigatorProps = {};

function NavigatorComponent({}: TNavigatorProps) {
  return (
    <View className="absolute bottom-0 left-0 w-full h-auto px-5 p-3">
      <View className="w-full h-full flex flex-row justify-between gap-3 bg-whxite rounded-3xl  pxb-5 ">
        <View className="absolute -top-3 left-0  w-full h-full   rounded-3xl flex justify-center items-center">
          <View className="w-full h-full scale-[0.95] bg-whxite/20 rounded-3xl"></View>
        </View>
        <View className="w-full h-full flex flex-row justify-between p-3">
          {_navigation.map((item, _) => (
            <View
              key={_}
              className=" w-1/6 p-3 text-center aspect-square rounded-full bg-wxhite/5 text-tangerine !fill-rose-800"
            >
              {item.icon}
              <Text className="text-xs !text-transparent !whitespace-nowrap text-center">
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export const Navigator = React.memo(NavigatorComponent);
