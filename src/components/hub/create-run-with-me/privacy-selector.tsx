import React from 'react';

import { Image, Text, View } from '@/ui';
import { DropdownIcon } from '@/ui/icons';

export function PrivacySelector() {
  return (
    <View
      className="h-[66px] flex-row items-center justify-between rounded-full bg-card px-6"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ backgroundColor: '#121212' }}
    >
      <Text className="text-[15px] font-medium text-[#989898]">Privacy</Text>
      <View className="flex-row items-center gap-2">
        <Image
          source={require('@/assets/icons/fire3.png')}
          className="h-[20px] w-[20px]"
        />
        <Text className="text-[17px] font-medium">Personal</Text>
        <DropdownIcon />
      </View>
    </View>
  );
}
