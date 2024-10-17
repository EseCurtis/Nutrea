import React from 'react';

import { Image, ImageBackground, Text, TopNotch, View } from '@/ui';

export function FinishedHero() {
  return (
    <ImageBackground
      className="h-[320px] w-full"
      source={require('@/assets/hurray-bg.png')}
    >
      <TopNotch />
      <View className="items-center justify-center gap-6">
        <Image
          source={require('@/assets/icons/3d-badge.png')}
          className="h-[193px] w-[193px]"
        />
        <Text className="font-946-latin text-[64px]">FINISH</Text>
      </View>
    </ImageBackground>
  );
}
