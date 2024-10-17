import { MotiView } from 'moti';
import React from 'react';

import { Avatar, Image, Text, View } from '@/ui';

export function LeadersRock() {
  const leaders = [
    {
      img: require('@/assets/icons/leader-rock-2.png'),
      delay: 200,
    },
    {
      img: require('@/assets/icons/leader-rock-1.png'),
      delay: 50,
    },
    {
      img: require('@/assets/icons/leader-rock-3.png'),
      delay: 400,
    },
  ];

  return (
    <View className="flex-row items-end justify-center py-8">
      {leaders.map((item, index) => (
        <MotiView
          key={index}
          className="items-center justify-center gap-4"
          from={{
            translateY: 50,
          }}
          animate={{
            translateY: 0,
          }}
          delay={item.delay}
        >
          <View className="items-center justify-center gap-1">
            <Avatar variant="medium" />
            <Text className="text-center text-sm font-medium">
              Moremi ( You )
            </Text>
          </View>
          <Image
            source={item.img}
            className="w-[105px]"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: index === 0 ? 140 : index === 1 ? 186 : 109,
            }}
            contentFit="contain"
          />
        </MotiView>
      ))}
    </View>
  );
}
