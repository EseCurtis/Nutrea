/* eslint-disable max-lines-per-function */
import * as Haptics from 'expo-haptics';
import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colors from './colors';

const { width } = Dimensions.get('window');
const ITEM_SIZE = 10; // Width of each ruler mark

interface ScaleSliderProps {
  defaultValue?: number;
  onChangeValue?: (value: number) => void;
  maxValue?: number;
}

export const ScaleSlider: React.FC<ScaleSliderProps> = ({
  onChangeValue,
  maxValue = 1000,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const onMomentumScrollEnd = (event: any) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const newValue = Math.round(xOffset / ITEM_SIZE);

    if (onChangeValue) {
      onChangeValue(newValue);
    }
  };

  const handleScroll = (event: any) => {
    // Trigger haptic feedback based on scroll position
    const xOffset = event.nativeEvent.contentOffset.x;
    if (xOffset % ITEM_SIZE === 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onScroll(event);
  };

  return (
    <View className="gap-4">
      <View className="h-[53px] items-center">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onMomentumScrollEnd={onMomentumScrollEnd}
          contentContainerStyle={styles.scrollView}
          ref={scrollViewRef}
          bounces={false}
        >
          {Array.from({ length: maxValue / ITEM_SIZE }).map((_, i) => {
            let markStyle = styles.rulerMarkRegular;

            // Change mark style based on the position
            if (i % 10 === 0) {
              markStyle = styles.rulerMarkLong; // Long mark every 10th
            } else if (i % 7 === 0) {
              markStyle = styles.rulerMarkMedium; // Medium mark every 7th
            } else if (i % 5 === 0) {
              markStyle = styles.rulerMarkSmall; // Small mark every 5th
            }

            return (
              <View key={i} style={styles.rulerItem}>
                <View style={markStyle} />
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.pointer} />
      </View>
      <Text className="text-center font-medium text-white">
        Drag sideways to adjust
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'flex-end',
    paddingHorizontal: width / 2 - ITEM_SIZE / 2, // Center the first item
  },
  rulerItem: {
    width: ITEM_SIZE,
    alignItems: 'center',
    position: 'relative',
  },
  rulerMarkRegular: {
    width: 2,
    height: 12,
    backgroundColor: '#666666',
  },
  rulerMarkSmall: {
    width: 2,
    height: 20,
    backgroundColor: '#666666',
  },
  rulerMarkMedium: {
    width: 2,
    height: 35,
    backgroundColor: '#666666',
  },
  rulerMarkLong: {
    width: 2,
    height: 53,
    backgroundColor: '#666666',
  },
  pointer: {
    position: 'absolute',
    bottom: 0,
    height: 53,
    width: 2,
    backgroundColor: colors.primary[500],
  },
});
