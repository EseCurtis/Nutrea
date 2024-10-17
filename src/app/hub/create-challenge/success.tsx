import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';

import { AddFriendsButton } from '@/components/hub';
import { SuccessTitle } from '@/components/hub/create-run-with-me';
import { ShareCreatedChallengeButton } from '@/components/hub/share-created-challenge-button';
import {
  BottomNotch,
  HexagonShape,
  IconsGrid,
  Pressable,
  ScrollView,
  Text,
  View,
} from '@/ui';
import { CloseIcon } from '@/ui/icons';

export default function CreateRunWithMeSuccess() {
  return (
    <LinearGradient
      colors={['#35096E', '#000000', '#000000']}
      className="relative flex-1"
    >
      <ScrollView contentContainerClassName="flex-1">
        <IconsGrid showIds={[1, 2, 3, 4, 5, 6]} />
        <View className="mt-[-100px] gap-10">
          <View className="relative items-center justify-center">
            <HexagonShape text="5k" size={113} color="#3FFF5D" />
          </View>

          <SuccessTitle />
          <Pressable
            onPress={() => router.push('/hub/create-challenge/invite-friends')}
          >
            <AddFriendsButton />
          </Pressable>
          <ShareCreatedChallengeButton />
        </View>
      </ScrollView>

      <View className="items-center justify-center pt-4">
        <Pressable
          className="items-center justify-center"
          onPress={() => router.dismissAll()}
        >
          <CloseIcon width={46} height={46} />
          <Text className="mt-2 text-[17px] font-medium text-[#6C727F]">
            Close
          </Text>
        </Pressable>
        <BottomNotch />
      </View>
    </LinearGradient>
  );
}
