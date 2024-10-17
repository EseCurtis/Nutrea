import React from 'react';

import { Avatar, ListItem, Text } from '@/ui';

export function LeaderboardItem() {
  return (
    <ListItem
      title="Moremi (You)"
      leftItem={<Avatar variant="medium" />}
      rightItem={<Text className="font-946-latin text-xl">02:43</Text>}
    />
  );
}
