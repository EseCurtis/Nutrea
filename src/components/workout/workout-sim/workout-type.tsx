import React from 'react';
import { View } from 'react-native';

import { Image, Text } from '@/ui';

export function WorkoutType() {
  return (
    <View className="z-10 w-full items-center justify-center">
      <View className="h-[40px] flex-row items-center justify-center gap-2 rounded-full bg-[#282828] pl-5 pr-2">
        <Text className="text-xl font-medium">Running</Text>
        <View className="h-[26px] w-[26px] items-center justify-center rounded-full bg-[#4D4D4D]">
          <Image
            source={require('@/assets/icons/run-icon.png')}
            className="ml-[-4px] h-[16px] w-[16px]"
          />
        </View>
      </View>
    </View>
  );
}
