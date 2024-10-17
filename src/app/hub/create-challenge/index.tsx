import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';

import {
  ChallengeType,
  DateRangePicker,
  WorkoutType,
} from '@/components/hub/create-challenge';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import {
  AppBar,
  BottomNotch,
  Button,
  Input,
  ScrollView,
  Text,
  View,
} from '@/ui';

export default function CreateChallenge() {
  useSoftKeyboardEffect();

  return (
    <LinearGradient colors={['#141414', '#000000']} className="flex-1">
      <AppBar
        title="Challenge Details"
        hideNotch
        backType="close"
        onBack={router.back}
      />

      <ScrollView contentContainerClassName="flex-1 gap-6 px-6 py-2">
        <WorkoutType />
        <ChallengeType />
        <Input
          placeholder="Challenge Name"
          className="text-left font-sf-pro-medium text-[15px]"
          rightItems={<Text>0/20</Text>}
        />
        <Input
          placeholder="Challenge Name"
          className="h-[148px] rounded-[20px] pt-6 text-left font-sf-pro-medium text-[15px]"
          rightItems={<Text>0/20</Text>}
          rightItemsClassName="bottom-0 justify-end pb-4"
          multiline
        />
        <DateRangePicker />
      </ScrollView>

      <View className="px-6">
        <Button
          withIcon
          onPress={() => router.push('/hub/create-challenge/set-goal')}
        >
          Next - Set Goal
        </Button>
      </View>
      <BottomNotch />
    </LinearGradient>
  );
}
