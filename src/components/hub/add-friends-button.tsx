import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import { Text, View } from '@/ui';

export function AddFriendsButton() {
  return (
    <View className="px-6">
      <LinearGradient
        className="relative h-[190px] justify-between rounded-[24px] bg-card p-6"
        colors={['#00000000', '#F31B0D33']}
      >
        <Text className="text-xl font-bold">Add Your Friends</Text>
        <Text className="w-[220px] text-[15px] font-light">
          Friends that workout together, stay fit together
        </Text>
      </LinearGradient>
    </View>
  );
}
