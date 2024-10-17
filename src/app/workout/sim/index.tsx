import { MotiView } from 'moti';
import React, { useState } from 'react';

import {
  ControlBoard,
  Progress,
  RunSim,
  WorkoutType,
} from '@/components/workout';
import { Text, TopNotch, View } from '@/ui';

export default function Workout() {
  const [tab, setTab] = useState(0);

  return (
    <View className="flex-1">
      <View className="relative flex-1">
        <TopNotch />
        <WorkoutType />
        <Text className="z-10 my-5 text-center text-xl font-medium">
          Mikespro’s Run
        </Text>
        <Progress percentage={50} />

        <MotiView
          className="absolute left-0 top-0 h-full w-full"
          key={tab}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 600 }}
        >
          {tab === 0 && <RunSim />}
        </MotiView>
      </View>

      <View className="absolute bottom-0 w-full">
        <ControlBoard tab={tab} setTab={setTab} />
      </View>
    </View>
  );
}
