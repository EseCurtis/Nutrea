import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, View } from 'react-native';

import { ClubItem, SelectedClub } from '@/components/hub/create-run-with-me';
import { AppBar, BottomNotch, Button } from '@/ui';

export default function SelectClub() {
  return (
    <LinearGradient colors={['#141414', '#000000']} className="flex-1">
      <AppBar title="Clubs" hideNotch onBack={router.back} />
      <FlatList
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        renderItem={() => <ClubItem />}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View className="h-8" />}
        contentContainerClassName="pt-4 pb-[120px]"
        showsVerticalScrollIndicator={false}
      />

      <LinearGradient
        colors={[
          '#01010100',
          'rgba(7, 2, 26, 0.6)',
          'rgba(7, 2, 26, 0.8)',
          '#07021A',
          '#07021A',
          '#07021A',
        ]}
        className="absolute bottom-0 h-[130px] w-full justify-end px-6"
      >
        <Button
          withIcon
          onPress={() => router.push('/hub/create-run-with-me/success')}
          className="py-1 pl-1"
          leftItems={<SelectedClub />}
        >
          Confirm
        </Button>
        <BottomNotch />
      </LinearGradient>
    </LinearGradient>
  );
}
