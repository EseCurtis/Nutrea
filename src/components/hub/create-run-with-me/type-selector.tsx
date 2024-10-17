import React from 'react';

import { Image, Text, View } from '@/ui';

export function TypeSelector() {
  return (
    <View
      className="h-[146px] w-[48%] justify-between rounded-[19px] p-2 pt-4"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ backgroundColor: '#121212' }}
    >
      <View className="px-2">
        <Text className="text-[15px] font-medium text-[#989898]">Type</Text>
      </View>
      <View className="h-[93px] justify-between rounded-[15px] bg-[#262626] p-4">
        <Image
          source={require('@/assets/icons/fire.png')}
          className="h-5 w-5"
        />
        <Text className="text-[17px] font-medium">Competitive</Text>
      </View>
    </View>
  );
}
