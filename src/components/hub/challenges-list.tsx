import { Link } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';

import { Text, View } from '@/ui';

import { ChallengeItem } from './challenge-item';
import { CurrentListSwiper } from './current-list-swiper';

export function ChallengesList() {
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Text className="mb-4 px-6 text-[17px] font-medium">
            Current Challenge
          </Text>

          <CurrentListSwiper />

          <View className="my-6 flex-row items-center justify-between px-6">
            <Text className="text-[17px] font-medium">Join A Challenge</Text>
            <Link href={'/'} className="text-[17px] font-medium text-white">
              See More
            </Link>
          </View>
        </>
      }
      data={[1, 1, 1, 1]}
      renderItem={() => <ChallengeItem />}
      // eslint-disable-next-line react/no-unstable-nested-components
      ItemSeparatorComponent={() => <View className="h-6" />}
      contentContainerClassName="pb-6 pt-[90px]"
      showsVerticalScrollIndicator={false}
    />
  );
}
