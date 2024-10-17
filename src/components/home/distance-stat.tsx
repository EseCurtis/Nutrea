import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import { Image, Text, View } from '@/ui';

export function DistanceStat() {
  return (
    <LinearGradient
      className="h-[93px] w-[48%] justify-between rounded-xl bg-[#0F0F0F] p-4"
      colors={['#00000000', '#06701E33']}
    >
      <View className="flex-row items-center gap-1">
        <Image
          source={require('@/assets/icons/location.png')}
          className="h-[18px] w-[18px]"
        />
        <Text className="text-sm font-semibold text-[#6C727F]">Distance</Text>
      </View>

      <View className="flex-row gap-1">
        <Text className="text-[28px] font-semibold">10</Text>
        <Text className="font-semibold">KM</Text>
      </View>
    </LinearGradient>
  );
}
