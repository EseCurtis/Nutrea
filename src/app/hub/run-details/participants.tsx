import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';

import { LeaderboardItem } from '@/components/workout';
import { AppBar, View } from '@/ui';

export default function InviteFriends() {
  return (
    <LinearGradient colors={['#141414', '#000000']} className="flex-1">
      <AppBar
        title="Leaderboard"
        hideNotch
        onBack={router.back}
        backType="close"
      />
      <FlatList
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        renderItem={() => (
          <View className="px-6">
            <LeaderboardItem />
          </View>
        )}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View className="h-8" />}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[110px] pt-4"
      />
    </LinearGradient>
  );
}
