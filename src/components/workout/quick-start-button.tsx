import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';

import { Image, Pressable, Text, View } from '@/ui';

export function QuickStartButton() {
  return (
    <View className="absolute bottom-0 z-10 w-full items-center justify-center p-6">
      <Pressable
        onPress={() => {
          router.push('/workout/sim');
        }}
        className="overflow-hidden rounded-full"
      >
        <BlurView
          intensity={10}
          className="h-[65px] w-[160px] items-center p-[7px]"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ backgroundColor: 'rgba(120, 78, 241, 0.13)' }}
        >
          <LinearGradient
            colors={['#9215F4', '#332FEE']}
            className="h-full w-full flex-row items-center justify-center rounded-full"
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
          >
            <Text className="text-[17px] font-semibold">Quick Start</Text>
            <Image
              source={require('@/assets/icons/run-icon.png')}
              className="h-[26px] w-[26px]"
            />
          </LinearGradient>
        </BlurView>
      </Pressable>
    </View>
  );
}
