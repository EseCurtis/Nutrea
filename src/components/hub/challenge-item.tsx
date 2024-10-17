import React from 'react';

import { ChevronRightIcon, HexagonShape, View } from '@/ui';
import { ListItem } from '@/ui/list-item';

export function ChallengeItem() {
  return (
    <View className="pl-5 pr-6">
      <ListItem
        leftItem={<HexagonShape text="5k" size={73} color="#522FE0" />}
        title="Aug Weekly Challenge"
        description="Run 5 KM this week"
        rightItem={<ChevronRightIcon />}
      />
    </View>
  );
}
