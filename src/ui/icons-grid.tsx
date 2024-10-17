import type { ImageSource } from 'expo-image';
import { Image } from 'expo-image';
import { MotiView } from 'moti';
import React from 'react';
import { View } from 'react-native';

export function IconsGrid({ showIds }: { showIds: number[] }) {
  return (
    <View className="relative h-[300px] w-full overflow-hidden">
      {showIds?.includes(1) && (
        <View className="absolute left-[-15px] top-[84px] h-[110px] w-[130px] items-center justify-center">
          <ImageBox
            image={require('@/assets/icons/grid-icon-1.png')}
            delay={500}
          />
        </View>
      )}

      {showIds?.includes(2) && (
        <View className="absolute left-[115px] top-[80px] h-[110px] w-[90px] items-center justify-center">
          <ImageBox
            image={require('@/assets/icons/grid-icon-2.png')}
            delay={900}
          />
        </View>
      )}

      {showIds?.includes(3) && (
        <View className="absolute left-[130px] top-[20px] h-[180px] w-[180px] items-center justify-center">
          <ImageBox
            image={require('@/assets/icons/grid-icon-3.png')}
            delay={600}
          />
        </View>
      )}

      {showIds?.includes(4) && (
        <View className="absolute left-[300px] top-[40px] h-[80px] w-[110px] items-center justify-center">
          <ImageBox
            image={require('@/assets/icons/grid-icon-4.png')}
            delay={1000}
          />
        </View>
      )}

      {showIds?.includes(5) && (
        <View className="absolute left-[12px] top-[200px] h-[90px] w-[130px] items-center justify-center">
          <ImageBox
            image={require('@/assets/icons/grid-icon-5.png')}
            delay={600}
          />
        </View>
      )}

      {showIds?.includes(6) && (
        <View className="absolute left-[256px] top-[150px] h-[100px] w-[140px] items-center justify-center">
          <ImageBox
            image={require('@/assets/icons/grid-icon-6.png')}
            delay={800}
          />
        </View>
      )}
    </View>
  );
}

const ImageBox = ({ image, delay }: { image: ImageSource; delay: number }) => {
  return (
    <MotiView
      className="h-full w-full"
      from={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <Image
        source={image}
        className="h-full w-full"
        contentPosition="top"
        contentFit="contain"
      />
    </MotiView>
  );
};
