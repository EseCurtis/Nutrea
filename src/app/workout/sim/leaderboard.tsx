import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';

import { LeadersRock } from '@/components/hub/run-detail';
import { LeaderboardItem } from '@/components/workout';
import { AppBar, View } from '@/ui';

export default function Leaderboard() {
  return (
    <LinearGradient colors={['#141414', '#000000']} className="flex-1">
      <AppBar
        title="Leaders Board"
        backType="close"
        onBack={router.back}
        hideNotch
      />
      <FlatList
        ListHeaderComponent={
          <View className="p-6 pt-0">
            <LeadersRock />
          </View>
        }
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        renderItem={({ index }) => (
          <View className="px-6">
            <LeaderboardItem key={index} />
          </View>
        )}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View className="h-6" />}
        showsVerticalScrollIndicator={false}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </LinearGradient>
  );
}
