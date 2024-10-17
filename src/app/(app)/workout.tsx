import React, { useRef } from 'react';
import { Animated } from 'react-native';

import {
  NearbyMap,
  QuickStartButton,
  RunsList,
  TypeTitle,
  WorkoutCta,
} from '@/components/workout';
import { Text, View } from '@/ui';

export default function WorkoutScreen() {
  const imageHeight = 200;
  const scroll = useRef(new Animated.Value(0)).current;

  const scale = scroll.interpolate({
    inputRange: [-imageHeight, 0, imageHeight],
    outputRange: [2.5, 1, 0.85],
    extrapolate: 'clamp',
  });

  const translateYDown = scroll.interpolate({
    inputRange: [-imageHeight, 0, imageHeight],
    outputRange: [-imageHeight * 0.6, 0, imageHeight * 0.5],
    extrapolate: 'clamp',
  });

  const translateYUp = scroll.interpolate({
    inputRange: [-imageHeight, 0, imageHeight],
    outputRange: [imageHeight * 0.3, 0, 0],
    extrapolate: 'clamp',
  });

  const opacity = scroll.interpolate({
    inputRange: [-imageHeight, 0, imageHeight],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View className="flex-1 bg-[#09090B]">
      <Animated.View
        style={{
          transform: [
            { scale: scale },
            { translateY: translateYUp },
            { translateY: translateYDown },
          ],
          opacity,
        }}
        className="absolute left-0 top-0 w-full"
      >
        <NearbyMap />
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true }
        )}
        className="flex-1"
        contentContainerClassName="gap-8 pb-8 pt-[300px]"
        showsVerticalScrollIndicator={false}
      >
        <Text className="px-6 text-base font-medium">
          Join <Text className="font-946-latin text-[#CBFB44]">13</Text> people
          about to go on a run right now
        </Text>
        <WorkoutCta />
        <RunsList />
      </Animated.ScrollView>

      <TypeTitle />
      <QuickStartButton />
    </View>
  );
}
