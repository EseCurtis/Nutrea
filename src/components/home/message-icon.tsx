import React from 'react';

import { View } from '@/ui';
import { ChatIcon } from '@/ui/icons';

export function MessageIcon() {
  return (
    <View className="relative">
      <ChatIcon />
      {/* <View className="absolute right-0 top-0 z-10 h-[10px] w-[10px] rounded-full border-2 border-black bg-primary-500" /> */}
    </View>
  );
}
