import React from 'react';
import { View } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';

export const CircleSlider = ({
  progress = 75,
  setProgress,
  min = 0,
  max = 100,
}: {
  progress?: number;
  setProgress?: (value: number) => void;
  min?: number;
  max?: number;
}) => {
  return (
    <View className="relative items-center justify-center">
      <RadialSlider
        variant={'radial-circle-slider'}
        value={progress}
        min={min}
        max={max}
        onChange={(e) => setProgress && setProgress(e)}
        radius={130}
        linearGradient={[
          { offset: '100%', color: '#A1A4F8' },
          { offset: '100%', color: '#522FE0' },
        ]}
      />
    </View>
  );
};
