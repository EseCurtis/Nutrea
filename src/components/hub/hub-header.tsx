import React from 'react';

import { Pressable, Text, TopNotch, useModal, View } from '@/ui';
import { PlusIcon } from '@/ui/icons/plus';

import { SelectChallengeTypeModal } from './select-challenge-type-modal';

export function HubHeader() {
  const { ref, present, dismiss } = useModal();

  return (
    <View className="relative z-50">
      <TopNotch />
      <View className="flex-row items-center justify-between px-6 pb-4">
        <Text className="text-[32px] font-bold">Hub</Text>

        <Pressable
          onPress={present}
          className="h-[40px] w-[44px] items-center justify-center rounded-full bg-white"
        >
          <PlusIcon />
        </Pressable>
      </View>

      <SelectChallengeTypeModal getRef={ref} dismiss={dismiss} />
    </View>
  );
}
