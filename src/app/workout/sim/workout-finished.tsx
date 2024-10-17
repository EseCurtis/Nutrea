import { router } from 'expo-router';
import React, { useState } from 'react';

import { FinishedHero, LeaderboardListCard } from '@/components/workout';
import { BottomNotch, Button, ScrollView, TabBar, View } from '@/ui';

export default function WorkoutFinished() {
  const [tab, setTab] = useState(0);

  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="flex-1 gap-6">
        <FinishedHero />
        <TabBar
          tabs={[{ title: 'Leaderboard' }, { title: 'Stats' }]}
          activeTab={tab}
          onTabPress={(e) => setTab(e)}
        />
        <LeaderboardListCard />
      </ScrollView>

      <View className="flex-row items-center justify-between px-6 pt-4">
        <Button className="w-[45%]">Share</Button>
        <Button
          onPress={router.dismissAll}
          variant="secondary"
          className="w-[53%]"
        >
          Go Home
        </Button>
      </View>
      <BottomNotch />
    </View>
  );
}
