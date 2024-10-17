import React from 'react';
import { View } from 'react-native';

import { Text } from '@/ui';

export interface StepTitleProps {
  title: string;
  description: string;
}

export function StepTitle({ title, description }: StepTitleProps) {
  return (
    <View className="w-full items-center justify-center">
      <Text className="text-center text-[32px] font-bold">{title}</Text>
      <Text className="mx-auto mt-1 w-[320px] text-center text-base font-medium text-[#6C727F]">
        {description}
      </Text>
    </View>
  );
}
