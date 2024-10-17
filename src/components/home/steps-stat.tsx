import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import { Image, Text, View } from '@/ui';

export function StepsStat() {
  return (
    <LinearGradient
      className="h-[93px] w-[48%] justify-between rounded-xl bg-[#0F0F0F] p-4"
      colors={['#00000000', '#84530A33']}
    >
      <View className="flex-row items-center gap-1">
        <Image
          source={require('@/assets/icons/steps.png')}
          className="h-[18px] w-[18px]"
        />
        <Text className="text-sm font-semibold text-[#6C727F]">Steps</Text>
      </View>

      <View className="flex-row">
        <Text className="text-[28px] font-semibold">4,567</Text>
        <Text className="font-semibold text-[#6C727F]">/10,000</Text>
      </View>
    </LinearGradient>
  );
}
