import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { TabBar, View } from '@/ui';

export function ControlTabs({
  tab,
  setTab,
}: {
  tab: number;
  setTab: (tab: number) => void;
}) {
  return (
    <View className="px-4">
      <TabBar
        tabs={[
          { title: <Run color={tab === 0 ? '#fff' : '#1A1A1A'} /> },
          { title: <Map color={tab === 1 ? '#fff' : '#1A1A1A'} /> },
        ]}
        activeTab={tab}
        onTabPress={(e) => setTab(e)}
        containerClassName="justify-end"
        innerContainerClassName="bg-white"
        tabClassName="h-[36px] px-4 pt-[6px]"
        indicatorContainerClassName="h-[36px] p-[2px]"
        indicatorClassName="bg-card"
      />
    </View>
  );
}

function Run({ color }: { color: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Path
        d="M10.598 12.887l-2.285-.988A2.178 2.178 0 006.351 12l-2.17 1.22c-1.871 1.06-3.97-.89-3.078-2.833L4.88 2.2C5.635.582 7.873.456 8.772 1.987l4.615 7.763c1.078 1.83-.828 3.988-2.789 3.137z"
        fill={color}
      />
    </Svg>
  );
}

function Map({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.15 7.49c-.56 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"
        fill={color}
      />
      <Path
        d="M21.46 5.04C20.62 3.09 18.77 2 16.19 2H7.81C4.6 2 2 4.6 2 7.81v8.38c0 2.58 1.09 4.43 3.04 5.27.19.08.41.03.55-.11L21.35 5.59c.15-.15.2-.37.11-.55zm-10.93 7.2c-.39.38-.9.56-1.41.56-.51 0-1.02-.19-1.41-.56C6.69 11.28 5.57 9.75 6 7.93c.38-1.65 1.84-2.39 3.12-2.39s2.74.74 3.12 2.4c.42 1.81-.7 3.34-1.71 4.3zM19.47 20.53c.22.22.19.58-.08.73-.88.49-1.95.74-3.2.74H7.81c-.29 0-.41-.34-.21-.54l6.04-6.04c.2-.2.51-.2.71 0l5.12 5.11zM22 7.81v8.38c0 1.25-.25 2.33-.74 3.2-.15.27-.51.29-.73.08l-5.12-5.12c-.2-.2-.2-.51 0-.71l6.04-6.04c.21-.2.55-.08.55.21z"
        fill={color}
      />
    </Svg>
  );
}
