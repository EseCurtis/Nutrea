import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';

import {
  DateDetail,
  LeaderboardList,
  ParticipantsButton,
} from '@/components/hub/run-detail';
import { AppBar, Image, Text, View } from '@/ui';

export default function RunDetails() {
  return (
    <LinearGradient
      colors={['#6E1B09', '#000000', '#000000']}
      className="relative flex-1"
    >
      <AppBar title="Run Details" onBack={router.back} />
      <View className="flex-1 gap-8 py-8">
        <Image
          source={require('@/assets/icons/run-img-1.png')}
          className="mx-auto h-[100px] w-[100px]"
        />
        <Text className="text-center text-[28px] font-bold">Moremi’s Run</Text>
        <DateDetail />
        <ParticipantsButton />
        <LeaderboardList />
      </View>
    </LinearGradient>
  );
}
