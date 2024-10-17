import React from 'react';

import { Text, View } from '@/ui';

import { RunItem } from './run-item';

export function RunsList() {
  return (
    <View className="gap-6 px-6">
      <Text className="text-xl font-semibold">Upcoming Runs</Text>
      <View className="gap-4">
        {[1, 1, 1, 1, 1, 1].map((item, index) => (
          <RunItem key={index} />
        ))}
      </View>
    </View>
  );
}
