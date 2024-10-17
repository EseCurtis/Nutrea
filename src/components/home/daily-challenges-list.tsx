import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';

import { WIDTH } from '@/ui';

import { DailyChallengeItem } from './daily-challenge-item';

export function DailyChallengesList() {
  const ref = useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: WIDTH / 1.6,
    height: 170,
  } as const;

  const data = [...new Array(6).keys()];

  return (
    <View className="mt-6">
      <Carousel
        {...baseOptions}
        loop={false}
        ref={ref}
        style={styles.container}
        autoPlay={false}
        autoPlayInterval={2000}
        data={data}
        pagingEnabled={true}
        renderItem={({ index }) => (
          <View key={index} style={styles.item}>
            <DailyChallengeItem />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: { flex: 1, marginLeft: '8%' },
});
