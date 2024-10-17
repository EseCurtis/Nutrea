import React from 'react';

import { Text, View } from '@/ui';

import { CaloriesStat } from './calories-stat';
import { DistanceStat } from './distance-stat';
import { MoreStats } from './more-stats';
import { StepsStat } from './steps-stat';

export function StatList() {
  return (
    <View className="mt-6 gap-6 px-6">
      <Text className="font-semibold uppercase">ACTIVITY METRIC</Text>
      <View className="flex flex-row flex-wrap justify-between gap-y-6">
        <StepsStat />
        <CaloriesStat />
        <DistanceStat />
        <MoreStats />
      </View>
    </View>
  );
}
