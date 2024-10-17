import React from 'react';

import { Text, View } from '@/ui';

export function SuccessTitle() {
  return (
    <View className="gap-2">
      <Text className="text-center font-946-latin text-[28px] italic">
        Run Created
      </Text>
      <Text className="mx-auto w-[320px] text-center font-light">
        Your run challenge has been created successfully. Share with your
        friends lorum ipsum
      </Text>
    </View>
  );
}
