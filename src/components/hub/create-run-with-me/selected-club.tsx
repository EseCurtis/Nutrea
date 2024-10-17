import React from 'react';

import { Avatar, Text, View } from '@/ui';

export function SelectedClub() {
  return (
    <View className="h-full w-[200px] flex-row items-center gap-4 rounded-full bg-[#F1F1F1] px-1">
      <Avatar
        variant="medium"
        source="https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
      />
      <Text className="text-[17px] font-medium text-black">
        Name of club...
      </Text>
    </View>
  );
}
