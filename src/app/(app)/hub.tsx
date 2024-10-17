import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';

import { ChallengesList, HubHeader, WithMeList } from '@/components/hub';
import { TabBar } from '@/ui';

export default function HubScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'With Me' },
    { key: 'second', title: 'Challenges' },
  ]);

  const pagerViewRef = useRef<any>(null);

  return (
    <>
      <HubHeader />
      <LinearGradient
        colors={['#000', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}
        className="absolute top-[100px] z-10 w-full items-center justify-center py-6"
      >
        <TabBar
          tabs={routes}
          onTabPress={(i) => {
            setIndex(i);
            pagerViewRef.current?.setPage(i);
          }}
          activeTab={index}
        />
      </LinearGradient>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerViewRef}
        scrollEnabled={false}
      >
        <WithMeList key="0" />
        <ChallengesList key="1" />
      </PagerView>
    </>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
