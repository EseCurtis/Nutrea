/* eslint-disable max-lines-per-function */
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Modal } from './modal';

export function ShareLinkModal({
  modalRef,
  onDismiss,
}: {
  modalRef: any;
  onDismiss: () => void;
}) {
  const icons = [
    {
      label: 'Feed',
      icon: require('@/assets/icons/feed.png'),
      onPress: () => {},
    },
    {
      label: 'Instagram',
      icon: require('@/assets/icons/instagram.png'),
      onPress: () => {},
    },
    {
      label: 'Tiktok',
      icon: require('@/assets/icons/tiktok-light.png'),
      onPress: () => {},
    },
    {
      label: 'Snapchat',
      icon: require('@/assets/icons/snapchat.png'),
      onPress: () => {},
    },
    {
      label: 'More',
      icon: require('@/assets/icons/more.png'),
      onPress: () => {},
    },
  ];

  return (
    <Modal snapPoints={['55%']} ref={modalRef} onDismiss={onDismiss}>
      <View className="gap-8 px-6">
        <View className="mt-[-20px] items-center justify-center">
          <Image
            source={require('@/assets/icons/3d-star.png')}
            className="h-[110px] w-[110px]"
          />
          <Text className="mt-4 font-sf-pro-medium text-[17px] text-white">
            Share link
          </Text>
        </View>

        <View className="h-[60px] w-full flex-row items-center rounded-full bg-[#1F1F1F]">
          <Text className="px-6 font-sf-pro-medium text-[17px] text-white">
            athlerse.tl/a8dhddiyslsjd192wm
          </Text>

          <Pressable className="absolute right-1 h-[52px] w-[76px] items-center justify-center rounded-full bg-white">
            <Text className="font-sf-pro-medium text-[17px]">Copy</Text>
          </Pressable>
        </View>

        <View className="w-full flex-row items-center justify-between">
          {icons.map((item, index) => (
            <Pressable
              className="w-[19%] items-center justify-center gap-2"
              key={index}
            >
              <Image
                source={item.icon}
                className="h-[60px] w-full"
                contentFit="contain"
              />
              <Text className="font-sf-pro-medium text-sm text-white">
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
}
