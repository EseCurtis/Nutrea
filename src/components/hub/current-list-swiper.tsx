import { MotiView } from 'moti';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';

import { WIDTH } from '@/ui';

import { CurrentItemCard } from './current-item-card';

export function CurrentListSwiper() {
  const ref = useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: WIDTH * 0.75,
    height: 235,
  } as const;

  const [activeIndex, setActiveIndex] = useState(0);

  const data = [...new Array(6).keys()];

  return (
    <>
      <Carousel
        {...baseOptions}
        loop={false}
        ref={ref}
        style={styles.container}
        autoPlay={false}
        autoPlayInterval={2000}
        onScrollEnd={(index) => setActiveIndex(index)}
        data={data}
        pagingEnabled={true}
        renderItem={({ index }) => (
          <View key={index} style={styles.item}>
            <CurrentItemCard />
          </View>
        )}
      />

      <View className="mt-6 flex-row items-center justify-center gap-2">
        {data?.map((_, index) => (
          <MotiView
            from={{
              width: 9,
            }}
            animate={{
              width: activeIndex === index ? 23 : 9,
            }}
            className="h-[9px] rounded-full"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: activeIndex === index ? '#D9D9D9' : '#4B4B4B',
            }}
            key={index}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: { flex: 1, marginLeft: '8%' },
});
