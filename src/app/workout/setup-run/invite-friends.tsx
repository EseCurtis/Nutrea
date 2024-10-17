import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';

import { FriendItem } from '@/components/workout/setup-run';
import { useWorkoutStore } from '@/components/workout/store';
import { AppBar, BottomNotch, Button, SearchBar, View } from '@/ui';

export default function InviteFriends() {
  const { setShowShare } = useWorkoutStore();

  return (
    <LinearGradient colors={['#141414', '#000000']} className="flex-1">
      <AppBar
        title="Invite Friends"
        hideNotch
        onBack={router.back}
        backType="close"
      />
      <View className="p-6">
        <SearchBar />
      </View>
      <FlatList
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        renderItem={() => <FriendItem />}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View className="h-8" />}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[110px]"
      />

      <LinearGradient
        colors={['#01010100', 'rgba(7, 2, 26, 0.6)', '#07021A']}
        className="absolute bottom-0 px-6 pt-6"
      >
        <View className="flex-row items-center justify-between">
          <Button
            className="w-[45%]"
            onPress={() => {
              setShowShare(true);
              router.back();
            }}
          >
            Share Link
          </Button>
          <Button variant="secondary" className="w-[53%]">
            Send Invite
          </Button>
        </View>

        <BottomNotch />
      </LinearGradient>
    </LinearGradient>
  );
}
