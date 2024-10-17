import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import { Image, Text, View } from '@/ui';

export function CaloriesStat() {
  return (
    <LinearGradient
      className="h-[93px] w-[48%] justify-between rounded-xl bg-[#0F0F0F] p-4"
      colors={['#00000000', '#840A1833']}
    >
      <View className="flex-row items-center gap-1">
        <Image
          source={require('@/assets/icons/fire2.png')}
          className="h-[18px] w-[18px]"
        />
        <Text className="text-sm font-semibold text-[#6C727F]">Calories</Text>
      </View>

      <View className="flex-row gap-1">
        <Text className="text-[28px] font-semibold">120</Text>
        <Text className="font-semibold">k/cal</Text>
      </View>
    </LinearGradient>
  );
}
