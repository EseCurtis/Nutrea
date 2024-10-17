import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const OctagonShape = ({
  size = 60,
  color = '#3FFF5D',
  text,
}: {
  size?: number;
  text?: string;
  color?: string;
}) => {
  const sideLength = size / 2.5; // Adjust this to control the size of the sides
  const diagonal = Math.sqrt(2) * sideLength;

  const Shape = ({ bg }: { bg: string }) => {
    return Array.from({ length: 8 }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.side,
          {
            backgroundColor: bg,
            width: sideLength,
            height: sideLength,
            transform: [
              { rotate: `${index * 45}deg` },
              { translateY: -diagonal / 2 },
            ],
          },
        ]}
      />
    ));
  };

  return (
    <View
      style={[styles.octagon, { width: size, height: size }]}
      className="relative items-center justify-center"
    >
      <Shape bg={color} />
      <View
        className="absolute items-center justify-center"
        style={{ transform: [{ scale: 0.9 }] }}
      >
        <Shape bg="#000" />
      </View>
      <Text
        className="absolute z-10 font-946-latin text-[20px] italic text-white"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ fontFamily: '946-latin' }}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  octagon: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  side: {
    position: 'absolute',
    backgroundColor: 'blue',
  },
});
