import { router } from 'expo-router';
import React from 'react';

import { Pressable, Text, View } from '@/ui';
import { StopWatch } from '@/ui/icons';
import { MapRoute } from '@/ui/icons/map-route';
import { PeopleIcon } from '@/ui/icons/people';

export function RunItem() {
  const stats = [
    {
      value: '5 mins',
      icon: <StopWatch />,
    },
    {
      value: '5KM',
      icon: <MapRoute />,
    },
    {
      value: '23',
      icon: <PeopleIcon fill={'#FF3F56'} />,
    },
  ];

  return (
    <Pressable
      onPress={() => router.push('/workout/sim/workout-lobby')}
      className="overflow-hidden rounded-[15px] bg-[#1F1F1F]"
    >
      <View className="flex-row items-center justify-between p-5">
        <Text className="text-[17px] font-medium">Mikepro’s Run</Text>
        <Text className="text-base font-medium">Every 3 days</Text>
      </View>

      <View className="flex-row items-center justify-between bg-[#262626] p-5">
        {stats.map((item, index) => (
          <View key={index} className="flex-row items-center gap-1">
            {item.icon}
            <Text className="text-base font-medium">{item.value}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}
