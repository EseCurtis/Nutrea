import { router } from 'expo-router';
import React from 'react';

import { ChevronDownIcon, Pressable, Text } from '@/ui';

export function SelectClubButton() {
  return (
    <Pressable
      onPress={() => router.push('/hub/create-run-with-me/select-club')}
      className="h-[66px] flex-row items-center justify-between rounded-full bg-card px-6"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ backgroundColor: '#121212' }}
    >
      <Text className="text-[15px] font-medium text-[#989898]">
        Select Club
      </Text>
      <ChevronDownIcon />
    </Pressable>
  );
}
