import React from 'react';
import { View } from 'react-native';

import { CirclePulse, ImageBackground } from '@/ui';

export function NearbyMap() {
  return (
    <ImageBackground
      source={require('@/assets/map.png')}
      className="h-[430px] w-full justify-end"
      contentFit="cover"
    >
      <View className="absolute right-1/3 top-[200px] items-center justify-center">
        <CirclePulse />
        <View className="absolute h-[14px] w-[14px] rounded-full bg-primary-500" />
      </View>
    </ImageBackground>
  );
}
