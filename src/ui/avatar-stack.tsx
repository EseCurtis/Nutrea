import React from 'react';
import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Avatar } from './avatar';
import colors from './colors';

export function AvatarStack({
  avatars,
  text,
  borderColor = colors.card,
  size = 'small',
}: {
  avatars: string[];
  text?: string;
  borderColor?: string;
  size?: 'small' | 'medium' | 'large';
}) {
  return (
    <View className="flex-row items-center">
      {avatars?.map((item, index) => (
        <Avatar
          key={index}
          source={item}
          className={index !== 0 ? 'ml-[-10px] border-4' : 'border-4'}
          style={{ borderColor }}
          variant={size}
        />
      ))}
      {text && (
        <View
          className={twMerge(
            'ml-[-10px] items-center justify-center rounded-full border-4 bg-primary-500',
            size === 'small'
              ? 'h-[32px] w-[32px]'
              : size === 'medium'
              ? 'h-[44px] w-[44px]'
              : 'h-[68px] w-[68px]'
          )}
          style={{ borderColor }}
        >
          <Text className="font-sf-pro-medium text-xs text-white">{text}</Text>
        </View>
      )}
    </View>
  );
}
