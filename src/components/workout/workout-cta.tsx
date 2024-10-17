import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';

import { Pressable, Text, View } from '@/ui';
import { WorkoutIcon } from '@/ui/icons';
import { PeopleIcon } from '@/ui/icons/people';

export function WorkoutCta() {
  const cta = [
    {
      label: 'Run Solo',
      icon: <WorkoutIcon fill={'#fff'} width={24} height={24} />,
      onPress: () => router.push('/workout/setup-run'),
    },
    {
      label: 'Run With Me',
      icon: <PeopleIcon />,
      onPress: () => router.push('/hub/create-run-with-me'),
    },
  ];

  return (
    <View className="flex-row items-center justify-between px-6">
      {cta.map((item, index) => (
        <Pressable key={index} onPress={item.onPress} className="w-[48%]">
          <LinearGradient
            className="h-[130px] justify-between rounded-[16px] bg-[#0F0F12] p-4 pb-6"
            colors={['#00000000', '#56565633']}
          >
            {item?.icon}
            <Text className="text-[17px] font-bold">{item?.label}</Text>
          </LinearGradient>
        </Pressable>
      ))}
    </View>
  );
}
