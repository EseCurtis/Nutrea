import { router } from 'expo-router';
import React from 'react';

import { BottomNotch, Image, Pressable, Text, View } from '@/ui';
import { CloseIcon, MicIcon, PauseIcon } from '@/ui/icons';

import { ControlTabs } from './control-tabs';
import { LeaderboardButton } from './leader-board-button';

export function ControlBoard({
  tab,
  setTab,
}: {
  tab: number;
  setTab: (tab: number) => void;
}) {
  return (
    <View className="w-full gap-4">
      <ControlTabs tab={tab} setTab={setTab} />

      <View className="rounded-t-[32px] bg-[#0F0F12] p-6">
        <View className="flex-row items-center justify-between px-4">
          <View className="w-[105px]">
            <Text className="text-xs text-[#848484]">TIME</Text>
            <Text className="font-946-latin text-xl">02:38</Text>
          </View>

          <View className="items-center justify-center">
            <Text className="text-xs text-[#848484]">POST</Text>
            <View className="relative items-center justify-center">
              <Image
                source={require('@/assets/icons/meter.png')}
                className="h-[76px] w-[76px]"
              />
              <Text className="absolute bottom-[20px] text-right font-946-latin text-xl text-[#8278FE]">
                190
              </Text>
            </View>
          </View>

          <View className="w-[105px]">
            <Text className="text-right text-xs text-[#848484]">PACE</Text>
            <Text className="text-right font-946-latin text-xl">9KM/hr</Text>
          </View>
        </View>

        <View className="mt-8">
          <LeaderboardButton />
        </View>

        <View className="mt-[70px] flex-row items-center justify-between px-12">
          <Pressable className="h-[52px] w-[52px] items-center justify-center rounded-full bg-white">
            <MicIcon />
          </Pressable>

          <Pressable className="mt-[-60px] h-[80px] w-[80px] items-center justify-center rounded-full bg-[#19191F]">
            <PauseIcon />
          </Pressable>

          <Pressable
            onPress={() => router.push('/workout/sim/workout-finished')}
            className="h-[52px] w-[52px] items-center justify-center rounded-full bg-[#FF3F56]"
          >
            <CloseIcon width={34} height={34} />
          </Pressable>
        </View>

        <BottomNotch />
      </View>
    </View>
  );
}
