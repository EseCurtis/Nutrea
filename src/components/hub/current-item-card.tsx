import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';

import { Pressable, Text, View } from '@/ui';
import { LocationIcon, RankingIcon } from '@/ui/icons';

export function CurrentItemCard() {
  const stats = [
    {
      value: '10th',
      icon: <RankingIcon />,
    },
    {
      value: '40KM',
      icon: <LocationIcon />,
    },
  ];

  return (
    <Pressable onPress={() => router.push('/hub/run-details')}>
      <LinearGradient
        colors={['#F9E993', '#FCCCCC']}
        className="h-[235px] w-full items-center justify-center rounded-[35px] p-[2px]"
      >
        <LinearGradient
          colors={['#171717', '#000000']}
          className="h-[211px] w-full justify-between rounded-[32px] p-6"
        >
          <View className="flex-row items-start justify-between">
            <CircularProgressBase
              value={50}
              maxValue={100}
              radius={30}
              activeStrokeColor={'#D2F17B'}
              activeStrokeWidth={5}
              inActiveStrokeWidth={5}
              inActiveStrokeColor={'#4B4B4B'}
            >
              <Text
                className="font-946-latin text-sm font-bold italic"
                style={{ fontFamily: '946-latin' }}
              >
                35K
              </Text>
            </CircularProgressBase>

            <Text className="mt-4 text-right text-[17px] font-medium">
              10 days left
            </Text>
          </View>

          <View className="gap-6">
            <Text className="text-[20px] font-bold">10K Tempo Run</Text>
            <View className="flex-row items-center justify-between">
              {stats?.map((item, index) => (
                <View key={index} className="flex-row items-center gap-2">
                  {item?.icon}
                  <Text className="text-[17px] font-medium">{item?.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </LinearGradient>
    </Pressable>
  );
}
