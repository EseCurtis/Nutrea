import React from 'react';

import { ChevronDownIcon, Text, View } from '@/ui';
import { Menu } from '@/ui/menu';

export function WorkoutType() {
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
      <View
        className="h-[66px] flex-row items-center justify-between rounded-full bg-card px-6"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ backgroundColor: '#121212' }}
      >
        <Text className="text-[15px] font-medium">Choose Workout Type</Text>
        <ChevronDownIcon />
      </View>
    </Menu>
  );
}
