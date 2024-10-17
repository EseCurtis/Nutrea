import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import { Image, Text, View } from '@/ui';

export function MoreStats() {
  return (
    <LinearGradient
      className="h-[93px] w-[48%] justify-between rounded-xl bg-[#0F0F0F] p-4"
      colors={['#00000000', '#9050F933']}
    >
      <Text className="text-sm font-semibold">See More</Text>

      <View className="flex-row gap-1">
        <Image
          source={require('@/assets/icons/fire.png')}
          className="h-[18px] w-[18px]"
        />
        <Image
          source={require('@/assets/icons/location.png')}
          className="h-[18px] w-[18px]"
        />
        <Image
          source={require('@/assets/icons/steps.png')}
          className="h-[18px] w-[18px]"
        />
      </View>
    </LinearGradient>
  );
}
