import React from 'react';

import { ChevronDownIcon, Image, Text, TopNotch, View } from '@/ui';
import { Menu } from '@/ui/menu';

export function TypeTitle() {
  const pickerActions = [
    {
      id: 'run',
      title: 'Run',
    },
    {
      id: 'walk',
      title: 'Walk',
    },
    {
      id: 'cycle',
      title: 'Cycle',
    },
  ];

  return (
    <View className="absolute top-0 w-full items-center justify-center p-2">
      <TopNotch />
      <Menu
        actions={pickerActions}
        onPressAction={({ nativeEvent }) => {
          console.log(nativeEvent);
        }}
      >
        <View className="h-[46px] flex-row items-center justify-center gap-2 rounded-full border-2 border-[#383838] bg-[#282828] px-3">
          <Image
            source={require('@/assets/icons/run-icon.png')}
            className="h-[19px] w-[19px]"
          />
          <Text className="text-xl font-medium">Run</Text>
          <ChevronDownIcon />
        </View>
      </Menu>
    </View>
  );
}
