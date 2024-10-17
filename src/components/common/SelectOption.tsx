import { useEffect, useRef, useCallback, useMemo } from "react";
import { View, Pressable } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

const PAGE_WIDTH = 300;
const PAGE_HEIGHT = 50;

type SelectProps = {
  options: {
    label: string;
    value: number;
  }[];
  selectedValue: number;
  onSelect: (option: { label: string; value: number }) => void;
};

function SelectOption({ options, selectedValue, onSelect }: SelectProps) {
  const r = useRef<ICarouselInstance>(null);

  useEffect(() => {
    const index = options.findIndex((o) => o.value === selectedValue);
    r.current?.scrollTo({
      count: index,
      animated: false,
    });
  }, []);

  // Create a memoized version of the carousel component
  const memoizedCarousel = useMemo(
    () => (
      <Carousel
        ref={r}
        loop={true}
        style={{
          width: 300,
          height: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        data={options}
        renderItem={({ item, animationValue }) => {
          return (
            <Item
              animationValue={animationValue}
              label={item.label}
              onPress={() =>
                r.current?.scrollTo({
                  count: animationValue.value,
                  animated: true,
                })
              }
            />
          );
        }}
        autoPlay={false}
        vertical
        onScrollEnd={(index) => {
          const option = options[index];
          onSelect(option);
        }}
      />
    ),
    [options, onSelect]
  );

  return (
    <View className="relative h-[300px] w-[300px] flex items-center justify-center">
      <View className="h-[60px] w-[160px] border-violet-900 border-t-[3px] border-b-[3px] absolute" />

      {memoizedCarousel}
    </View>
  );
}

export default SelectOption;

interface Props {
  animationValue: Animated.SharedValue<number>;
  label: string;
  onPress?: () => void;
}

const Item: React.FC<Props> = (props) => {
  const { animationValue, label, onPress } = props;

  const translateY = useSharedValue(0);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  }, [animationValue]);

  // @ts-ignore
  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [1, 1.25, 1],
      Extrapolate.CLAMP
    );

    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#b6bbc0", isDark ? "#fff" : "#000", "#b6bbc0"]
    );

    return {
      transform: [{ scale }, { translateY: translateY.value }],
      color,
    };
  }, [animationValue, translateY]);

  const onPressIn = useCallback(() => {
    translateY.value = withTiming(-8, { duration: 250 });
  }, [translateY]);

  const onPressOut = useCallback(() => {
    translateY.value = withTiming(0, { duration: 250 });
  }, [translateY]);

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          {
            height: PAGE_HEIGHT, // Adjust height
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          },
          containerStyle,
        ]}
      >
        <Animated.Text
          style={[
            {
              fontSize: 30,
              color: isDark ? "#fff" : "#26292E",
              fontFamily: "GreycliffCFMedium",
              textAlign: "center",
              width: "100%",
            },
            labelStyle,
          ]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};
