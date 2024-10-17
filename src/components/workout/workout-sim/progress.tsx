import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React from 'react';

import { Text, View } from '@/ui';

export const Progress = ({ percentage = 75 }: { percentage: number }) => {
  return (
    <View
      className="z-10 mx-auto h-[34px] w-[122px] items-center justify-center overflow-hidden rounded-full"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ backgroundColor: 'rgba(70, 34, 217, 0.3)' }}
    >
      <MotiView
        from={{ width: '0%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1000 }}
        id={`percent-${percentage}`}
        className="absolute left-0 h-full w-full items-center justify-center"
      >
        <LinearGradient
          className="h-full w-full"
          colors={['#6E50F0', '#4622D9']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
        />
      </MotiView>
      <View className="h-full w-full p-1">
        <View className="h-full w-full items-center justify-center rounded-full bg-black">
          <Text className="font-946-latin">35-40km</Text>
        </View>
      </View>
    </View>
  );
};
