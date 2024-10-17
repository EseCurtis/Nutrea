import React, { useCallback, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

export const ProgressBar = ({ radius = 100, strokeWidth = 10 }) => {
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;
  const pan = useRef(new Animated.ValueXY()).current;

  const angleRef = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const { dx, dy } = gestureState;
        const angle = Math.atan2(dy, dx);
        angleRef.current = angle;

        const x = radius * Math.cos(angle) + halfCircle - strokeWidth / 2;
        const y = radius * Math.sin(angle) + halfCircle - strokeWidth / 2;

        pan.setValue({ x, y });
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const path = useCallback(() => {
    const x1 = radius * Math.cos(angleRef.current) + halfCircle;
    const y1 = radius * Math.sin(angleRef.current) + halfCircle;
    const x2 = halfCircle;
    const y2 = strokeWidth / 2;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 0 0 ${x2} ${y2}`;
  }, [angleRef.current]);

  return (
    <View style={styles.container}>
      <Svg
        height={radius * 2 + strokeWidth * 2}
        width={radius * 2 + strokeWidth * 2}
      >
        <G rotation="270" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#d3d3d3"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Path
            d={path()}
            stroke="blue"
            strokeWidth={strokeWidth}
            fill="none"
          />
        </G>
      </Svg>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          pan.getLayout(),
          {
            position: 'absolute',
            width: strokeWidth,
            height: strokeWidth,
            borderRadius: strokeWidth / 2,
            backgroundColor: 'blue',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
