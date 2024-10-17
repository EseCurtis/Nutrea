import React from 'react';

import { Image, Text, View } from '@/ui';
import { DropdownIcon } from '@/ui/icons';

export function SelectType() {
  return (
    <View className="h-[66px] flex-row items-center justify-between rounded-full bg-card px-6">
      <Text className="text-[15px] font-medium text-[#989898]">Type</Text>
      <View className="flex-row items-center gap-2">
        <Image
          source={require('@/assets/icons/fire.png')}
          className="h-[20px] w-[20px]"
        />
        <Text className="text-[17px] font-medium">Competitive</Text>
        <DropdownIcon />
      </View>
    </View>
  );
}
