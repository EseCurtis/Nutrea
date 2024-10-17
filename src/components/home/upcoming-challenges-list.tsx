import React from 'react';

import { View } from '@/ui';

import { RunItem } from '../workout';

export function UpcomingChallengesList() {
  return (
    <View className="mt-6 gap-6 px-6">
      {[1, 1, 1, 1, 1, 1].map((item, index) => (
        <RunItem key={index} />
      ))}
    </View>
  );
}
