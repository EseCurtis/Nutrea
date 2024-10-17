import React from 'react';

import { ChevronRightFilledIcon, Text, View } from '@/ui';

export function DateRangePicker() {
  return (
    <>
      <View className="flex-row items-center justify-between">
        <View
          className="h-[66px] w-[154px] flex-row items-center justify-center rounded-full bg-card px-6"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ backgroundColor: '#121212' }}
        >
          <Text className="text-[15px] font-medium">Start Date</Text>
        </View>
        <ChevronRightFilledIcon />
        <View
          className="h-[66px] w-[154px] flex-row items-center justify-center rounded-full bg-card px-6"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ backgroundColor: '#121212' }}
        >
          <Text className="text-[15px] font-medium">End Date</Text>
        </View>
      </View>
    </>
  );
}
