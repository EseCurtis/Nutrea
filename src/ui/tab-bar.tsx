/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

import { useHapticFeedback } from '@/core/hooks/use-haptic-feedback';

type Tab = {
  title: string | React.ReactNode;
};

interface TabBarProps {
  tabs: Tab[];
  onTabPress?: (index: number) => void;
  activeTab: number;
  containerClassName?: string;
  tabClassName?: string;
  indicatorClassName?: string;
  activeTabLabelColor?: string;
  labelClassName?: string;
  innerContainerClassName?: string;
  indicatorContainerClassName?: string;
}

export const TabBar = ({
  tabs,
  onTabPress,
  activeTab,
  containerClassName,
  indicatorClassName,
  tabClassName,
  labelClassName,
  activeTabLabelColor = '#fff',
  innerContainerClassName,
  indicatorContainerClassName,
}: TabBarProps) => {
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const { haptic } = useHapticFeedback();

  const translateX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  useEffect(() => {
    if (tabWidths.length === tabs.length) {
      // Set the indicator to the correct position and width based on the active tab
      translateX.value = withTiming(
        tabWidths.slice(0, activeTab).reduce((acc, w) => acc + w, 0)
      );
      indicatorWidth.value = withTiming(tabWidths[activeTab] || 0);
    }
  }, [tabWidths, activeTab, tabs.length, translateX, indicatorWidth]);

  const handleTabPress = (index: number, width: number) => {
    translateX.value = withTiming(
      tabWidths.slice(0, index).reduce((acc, w) => acc + w, 0)
    );
    indicatorWidth.value = withTiming(width || 0);
    onTabPress?.(index);
    haptic();
  };

  const onTabLayout = (event: any, index: number) => {
    const { width } = event.nativeEvent.layout;
    setTabWidths((prev) => {
      const newWidths = [...prev];
      newWidths[index] = width;
      return newWidths;
    });
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    width: indicatorWidth.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      className={twMerge(
        'w-full items-center justify-center flex-row',
        containerClassName
      )}
    >
      <View
        className={twMerge(
          'relative rounded-full bg-card',
          innerContainerClassName
        )}
      >
        <Animated.View
          className={twMerge(
            'absolute left-0 h-[60px] rounded-full p-2',
            indicatorContainerClassName
          )}
          style={[animatedIndicatorStyle]}
        >
          <View
            className={twMerge(
              'bg-cardTint h-full w-full rounded-full',
              indicatorClassName
            )}
          />
        </Animated.View>

        <View className="flex-row items-start">
          {tabs.map((tab, index) => (
            <Pressable
              className={twMerge(
                'h-[60px] items-center justify-center px-6',
                tabClassName
              )}
              key={index}
              onPress={() => handleTabPress(index, tabWidths[index])}
              onLayout={(event) => onTabLayout(event, index)}
            >
              <Text
                style={activeTab === index && { color: activeTabLabelColor }}
                className={twMerge('font-semibold text-white', labelClassName)}
              >
                {tab.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};
