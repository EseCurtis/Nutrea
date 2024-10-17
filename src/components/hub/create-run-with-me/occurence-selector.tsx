import React from 'react';

import { Text, View } from '@/ui';

export function OccurenceSelector() {
  return (
    <View
      className="h-[146px] w-[48%] justify-between rounded-[19px] p-4"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ backgroundColor: '#121212' }}
    >
      <Text className="text-[15px] font-medium text-[#989898]">Occurence</Text>
      <Text className="text-[17px] font-medium">06:00 PM, Every Wednesday</Text>
    </View>
  );
}
