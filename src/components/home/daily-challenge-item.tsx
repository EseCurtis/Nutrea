import { router } from 'expo-router';
import React from 'react';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';

import { Pressable, Text, View } from '@/ui';

export function DailyChallengeItem() {
  return (
    <Pressable
      onPress={() => router.push('/hub/run-details')}
      className="h-[170px] justify-between rounded-[24px] bg-[#1A1A1E] p-6"
    >
      <CircularProgressBase
        value={70}
        maxValue={100}
        radius={30}
        activeStrokeColor={'#D2F17B'}
        activeStrokeWidth={5}
        inActiveStrokeWidth={5}
        inActiveStrokeColor={'#4B4B4B'}
      >
        <Text className="font-946-latin text-sm italic">35K</Text>
      </CircularProgressBase>

      <View className="gap-1">
        <Text
          className="text-[18px] font-semibold text-white"
          numberOfLines={1}
        >
          Aug Weekly Challenge
        </Text>
        <Text className="text-base font-medium text-[#6C727F]">
          Run 5 KM this week
        </Text>
      </View>
    </Pressable>
  );
}
