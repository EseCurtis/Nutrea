import React from 'react';

import { AvatarStack, Pressable, Text, View } from '@/ui';

export function ShareCreatedChallengeButton() {
  return (
    <View className="items-center justify-center">
      <Pressable className="flex-row items-center gap-2 rounded-full bg-white px-5 py-2">
        <Text className="text-[17px] font-medium text-[#040404]">Share</Text>
        <AvatarStack
          avatars={[
            require('@/assets/icons/snapchat.png'),
            require('@/assets/icons/instagram.png'),
            require('@/assets/icons/tiktok.png'),
          ]}
          borderColor="#fff"
        />
      </Pressable>
    </View>
  );
}
