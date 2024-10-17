import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { router } from 'expo-router';
import type { RefObject } from 'react';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Image, Modal, Pressable, Text, View } from '@/ui';

export function SelectChallengeTypeModal({
  getRef,
  dismiss,
}: {
  getRef: RefObject<BottomSheetModalMethods>;
  dismiss: () => void;
}) {
  const { bottom } = useSafeAreaInsets();
  const options = [
    {
      label: 'Run With Me',
      icon: require('@/assets/icons/bell.png'),
      route: 'hub/create-run-with-me',
    },
    {
      label: 'Challenge',
      icon: require('@/assets/icons/bell.png'),
      route: 'hub/create-challenge',
    },
  ];

  return (
    <Modal
      snapPoints={['55%']} // optional
      title="Select Challenge Type"
      ref={getRef}
      isGradients
      colors={['#9788F7', '#FCC4F8']}
    >
      <View className="flex-1 gap-1 px-1" style={{ paddingBottom: bottom }}>
        {options.map((item, index) => (
          <Pressable
            onPress={() => {
              dismiss();
              router.push(item.route as any);
            }}
            key={index}
            className="flex-1 flex-row items-center justify-between rounded-[33px] bg-black p-8"
          >
            <Text className="text-[17px] font-medium">{item?.label}</Text>
            <Image
              source={item?.icon}
              className="h-[94px] w-[94px]"
              contentFit="contain"
            />
          </Pressable>
        ))}
      </View>
    </Modal>
  );
}
