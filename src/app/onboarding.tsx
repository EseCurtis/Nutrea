import type { ImageSource } from 'expo-image';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import React from 'react';
import { StatusBar } from 'react-native';

import { useIsFirstTime } from '@/core';
import { Button, Image, ImageBackground, Text, View } from '@/ui';

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();

  return (
    <ImageBackground
      className="w-full flex-1 justify-end"
      source={require('@/assets/splash.png')}
    >
      <StatusBar barStyle="light-content" />
      <View className="absolute top-6 h-[255px] w-full">
        <ImageBox image={require('@/assets/onboard1.png')} />
      </View>

      <View>
        <View className="items-center justify-center">
          <MotiView
            from={{ opacity: 0, translateY: -500 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 500 }}
          >
            <Text className="mb-6 text-center text-6xl font-bold">
              Community Workout
            </Text>
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateY: -700 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 600 }}
          >
            <Button
              className="mb-[100px]"
              onPress={() => {
                setIsFirstTime(true);
                router.push('/auth/login');
              }}
            >
              Get started
            </Button>
          </MotiView>
        </View>

        <View className="h-[200px]">
          <ImageBox image={require('@/assets/onboard2.png')} />
        </View>
      </View>
    </ImageBackground>
  );
}

const ImageBox = ({ image }: { image: ImageSource }) => {
  return (
    <MotiView
      className="h-full w-full"
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1000 }}
    >
      <Image source={image} className="h-full w-full" contentPosition="top" />
    </MotiView>
  );
};
