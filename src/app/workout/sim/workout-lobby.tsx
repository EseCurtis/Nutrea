import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';

import { LobbyMembersList } from '@/components/workout';
import { AppBar, BottomNotch, Button, Text, View } from '@/ui';

export default function WorkoutLobby() {
  return (
    <View className="flex-1">
      <AppBar title="Lobby" onBack={router.back} />
      <View className="flex-1">
        <Text className="text-center font-medium text-[#A0A0A0]">
          Warming Up
        </Text>
        <View className="mx-auto mt-6 h-[200px] w-[200px] rounded-full bg-red-200" />
        <LobbyMembersList />
      </View>
      <LinearGradient
        colors={['#0F0F0F00', '#202020']}
        className="absolute bottom-0 z-10 h-[160px] w-full justify-end px-6"
      >
        <Button withIcon onPress={router.back}>
          Leave Lobby
        </Button>
        <BottomNotch />
      </LinearGradient>
    </View>
  );
}
