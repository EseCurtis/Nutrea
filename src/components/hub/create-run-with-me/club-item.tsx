import React from 'react';

import { Avatar, ListItem, Pressable, Text, View } from '@/ui';

export function ClubItem() {
  return (
    <View className="px-6">
      <ListItem
        leftItem={
          <Avatar
            variant="medium"
            source="https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
          />
        }
        title="Nimi"
        titleClassName="text-[17px] font-medium"
        rightItem={
          <Pressable className="h-[44px] items-center justify-center rounded-full border border-primary-500 px-[18px]">
            <Text className="text-[17px] font-medium">Select</Text>
          </Pressable>
        }
      />
    </View>
  );
}
