import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';

import { AppBar, BottomNotch, Button, View } from '@/ui';

export default function Personalize() {
  return (
    <LinearGradient colors={['#141414', '#000000']} className="flex-1">
      <AppBar title="Personalise" hideNotch onBack={router.back} />

      <View className="flex-1 gap-8 py-2">
        <View className="flex-1" />
      </View>

      <LinearGradient
        colors={['#01010100', 'rgba(7, 2, 26, 0.6)', '#07021A']}
        className="absolute bottom-0 w-full px-6 pt-6"
      >
        <Button
          withIcon
          onPress={() => router.push('/hub/create-challenge/success')}
        >
          Create Challenge
        </Button>
        <BottomNotch />
      </LinearGradient>
    </LinearGradient>
  );
}
