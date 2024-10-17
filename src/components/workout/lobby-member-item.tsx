import React from 'react';

import { Avatar, ListItem, Text, View } from '@/ui';

export function LobbyMemberItem() {
  return (
    <View className="px-6">
      <ListItem
        leftItem={
          <Avatar
            variant="medium"
            source={
              'https://images.unsplash.com/photo-1640952131659-49a06dd90ad2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIwfHxhdmF0YXJ8ZW58MHx8MHx8fDA%3D'
            }
          />
        }
        rightItem={
          <Text className="text-[17px] font-medium text-[#3FFF5D]">Joined</Text>
        }
        title="Moremi (You)"
      />
    </View>
  );
}
