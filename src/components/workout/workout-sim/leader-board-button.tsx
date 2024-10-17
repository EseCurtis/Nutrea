import { router } from 'expo-router';
import React from 'react';

import { AvatarStack, ChevronRightIcon, Pressable, Text, View } from '@/ui';

export function LeaderboardButton() {
  return (
    <Pressable
      onPress={() => router.push('/workout/sim/leaderboard')}
      className="h-[66px] flex-row items-center justify-between rounded-full bg-[#19191F] px-6"
    >
      <Text className="text-[15px] font-medium">Leaders board</Text>
      <View className="flex-row items-center gap-2">
        <AvatarStack
          avatars={[
            'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
          ]}
          text="+16"
          borderColor="#19191F"
        />
        <ChevronRightIcon width={16} height={16} />
      </View>
    </Pressable>
  );
}
