import React from 'react';

import { Text, View } from '@/ui';
import { CalenderIcon, StopWatch } from '@/ui/icons';

export function DateDetail() {
  const details = [
    {
      label: 'Next Run',
      value: 'Tue, 17th July',
      icon: <CalenderIcon />,
    },
    {
      label: 'Duration',
      value: '04:00',
      icon: <StopWatch />,
    },
  ];

  return (
    <View className="flex-row items-center justify-between px-10">
      {details.map((item, index) => (
        <View key={index} className="items-center justify-center gap-2">
          <View
            className="flex-row items-center gap-2 rounded-full border border-[#1B1B1B] px-3 py-2"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ backgroundColor: '#121212' }}
          >
            {item.icon}
            <Text className="font-medium">{item.label}</Text>
          </View>
          <Text className="text-center text-xl font-bold">{item.value}</Text>
        </View>
      ))}
    </View>
  );
}
