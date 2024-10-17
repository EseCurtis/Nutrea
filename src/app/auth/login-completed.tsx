import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';

import { AppBar, BottomNotch, Button, Text, View } from '@/ui';

export default function LoginCompleted() {
  return (
    <View className="flex-1">
      <AppBar onBack={() => router.push('/(app)')} backType="close" />
      <View className="flex-1 p-6">
        <Text className="text-[44px] font-bold">Jump right in</Text>

        <View className="mt-8 flex-row items-center justify-between">
          <View className="w-[49%] overflow-hidden rounded-l-[24px] rounded-r-[10px] bg-card">
            <LinearGradient
              colors={['#00000000', '#FB6EC333']}
              className="h-[137px]"
            />
          </View>
          <View className="w-[49%] overflow-hidden rounded-l-[10px] rounded-r-[24px] bg-card">
            <LinearGradient
              colors={['#00000000', '#FB6EC333']}
              className="h-[137px]"
            />
          </View>
        </View>

        <View className="mt-2 w-full overflow-hidden rounded-[24px] bg-card">
          <LinearGradient
            colors={['#00000000', '#FB766E33']}
            className="h-[190px]"
          />
        </View>

        <View className="mt-2 flex-row items-center justify-between">
          <View className="w-[59%] overflow-hidden rounded-[10px] rounded-bl-[24px] bg-card">
            <LinearGradient
              colors={['#00000000', '#6EFBD933']}
              className="h-[137px]"
            />
          </View>
          <View className="h-[137px] w-[39%] overflow-hidden rounded-[10px] rounded-br-[24px] bg-card" />
        </View>
      </View>

      <View className="px-6">
        <Button onPress={() => router.push('/(app)')} withIcon>
          Go Home
        </Button>
        <BottomNotch />
      </View>
    </View>
  );
}
