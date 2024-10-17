import { MotiView } from 'moti';
import React, { useState } from 'react';

import { DailyChallengesList, StatList } from '@/components/home';
import { MessageIcon } from '@/components/home/message-icon';
import { NotificationIcon } from '@/components/home/notification-icon';
import { UpcomingChallengesList } from '@/components/home/upcoming-challenges-list';
import { useAuth } from '@/core';
import { AppBar, Avatar, colors, ScrollView, TabBar, Text, View } from '@/ui';
import { ProfileColoredIcon } from '@/ui/icons/profile';

export default function Home() {
  const { user } = useAuth();
  const [tab, setTab] = useState(0);

  return (
    <View className="flex-1 ">
      <AppBar
        title="Home"
        onBack={() => {}}
        leftItems={
          user?.avatar ? (
            <Avatar source={user?.avatar} />
          ) : (
            <ProfileColoredIcon />
          )
        }
        rightItems={
          <>
            <MessageIcon />
            <NotificationIcon />
          </>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <StatList />
        <Text className="mb-5 mt-10 px-6 font-semibold uppercase">
          CHALLENGES
        </Text>
        <View className="flex-row items-center justify-between px-6">
          <View className="w-[70%]">
            <TabBar
              tabs={[{ title: 'Daily' }, { title: 'Upcoming' }]}
              activeTab={tab}
              onTabPress={(i) => setTab(i)}
              containerClassName="justify-start bg-transparent"
              innerContainerClassName="bg-transparent"
              indicatorClassName="bg-white"
              indicatorContainerClassName="h-[38px] p-0"
              tabClassName="h-[38px]"
              labelClassName="text-[#6C727F] text-xl"
              activeTabLabelColor={colors.primary[500]}
            />
          </View>

          <Text className="font-semibold">See More</Text>
        </View>
        <MotiView
          className="flex-1"
          key={tab}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 600 }}
        >
          {tab === 0 && <DailyChallengesList />}
          {tab === 1 && <UpcomingChallengesList />}
        </MotiView>
      </ScrollView>
    </View>
  );
}
