import { router } from 'expo-router';
import React, { Fragment } from 'react';

import { AvatarStack, Pressable, Text, View } from '@/ui';
import { Divider } from '@/ui/divider';

import { LeaderboardItem } from './leaderboard-item';

export function LeaderboardListCard() {
  return (
    <View className="px-6">
      <View className="rounded-2xl bg-[#202020] p-4">
        {[1, 1, 1]?.map((item, index) => (
          <Fragment key={index}>
            <LeaderboardItem />
            <Divider className="my-4 bg-[#2D2D2D]" />
          </Fragment>
        ))}

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <AvatarStack
              avatars={[
                'https://images.unsplash.com/photo-1661747675166-5cf96bd5d0dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxhdmF0YXJ8ZW58MHx8MHx8fDA%3D',
                'https://plus.unsplash.com/premium_photo-1682095643806-79da986ccf8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxhdmF0YXJ8ZW58MHx8MHx8fDA%3D',
              ]}
              size="medium"
              borderColor="#202020"
            />
            <Text className="text-[17px] font-medium">+ 10 others</Text>
          </View>

          <Pressable
            onPress={() => router.push('/workout/sim/leaderboard')}
            className="rounded-full bg-cardTint px-4 py-2"
          >
            <Text className="text-[17px] font-medium">View all</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
