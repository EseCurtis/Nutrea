import React from 'react';

import { ChevronDownFilledIcon, Text, View } from '@/ui';
import { Menu } from '@/ui/menu';

export function MetricSelector() {
  const pickerActions = [
    {
      id: 'distance',
      title: 'Distance',
    },
    {
      id: 'time',
      title: 'Time',
    },
  ];

  return (
    <Menu
      actions={pickerActions}
      onPressAction={({ nativeEvent }) => {
        console.log(nativeEvent);
      }}
    >
      <View className="mx-auto flex-row items-center justify-center gap-2 rounded-full bg-[#282828] p-[6px] pl-[12px]">
        <Text className="text-[17px] font-medium">Distance</Text>
        <ChevronDownFilledIcon />
      </View>
    </Menu>
  );
}
