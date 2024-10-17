import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedNumbers from 'react-native-animated-numbers';

import { DistanceUnit } from '@/api/challenges';
import { colors, Pressable, ScaleSlider, Text, View } from '@/ui';

import { useHubStore } from '../store';

export function DistanceSlider() {
  const { createWithMeData, setCreateWithMeData } = useHubStore();
  const distance_units = [DistanceUnit.MILES, DistanceUnit.KM];

  return (
    <View className="items-center justify-center gap-6">
      <View className="w-full flex-row items-center justify-between px-4">
        <View className="w-[60px]" />

        <AnimatedNumbers
          includeComma
          animateToNumber={createWithMeData?.distance!}
          fontStyle={styles.animatedText}
        />

        <View className="w-[60px] gap-2">
          {distance_units.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setCreateWithMeData({ distance_unit: item })}
            >
              <Text
                className="text-center text-[20px] font-medium"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  color:
                    createWithMeData?.distance_unit === item
                      ? 'white'
                      : '#6C727F',
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScaleSlider
        onChangeValue={(v) => setCreateWithMeData({ distance: v })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animatedText: {
    fontSize: 52,
    fontWeight: '900',
    color: colors.primary[500],
    fontStyle: 'italic',
  },
});
