import { Animated, ScrollView } from "react-native";
import { forwardRef } from "react";
import { HEADER_HEIGHT, IMG_HEADER_HEIGHT } from "../constants";
import AnimatedNavbar from "./AnimatedNavbar";
import type { AnimatedScrollViewProps } from "../types";
import { useAnimateScrollView } from "../hooks/useAnimateScrollView";
import { AnimatedHeader } from "./AnimatedHeader";

export const AnimatedScrollView = forwardRef<
  ScrollView,
  AnimatedScrollViewProps
>(
  (
    {
      TopNavBarComponent,
      HeaderNavbarComponent,
      HeaderComponent,
      headerMaxHeight,
      topBarHeight,
      topBarElevation,
      headerImage,
      disableScale,
      children,
      imageStyle,
      blurhash,
      ...props
    }: AnimatedScrollViewProps,
    ref
  ) => {
    const imageHeight = headerMaxHeight || IMG_HEADER_HEIGHT;
    const headerNavHeight = topBarHeight || HEADER_HEIGHT;
    const headerElevation = topBarElevation || 0;
    const [scroll, onScroll, scale, translateYDown, translateYUp] =
      useAnimateScrollView(imageHeight, disableScale);

    return (
      <>
        <Animated.ScrollView
          ref={ref}
          scrollEventThrottle={16}
          {...props}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            {
              useNativeDriver: true,
              listener: (event) =>
                props.onScroll && props.onScroll(event as any),
            }
          )}
        >
          <AnimatedHeader
            HeaderComponent={HeaderComponent}
            headerImage={headerImage}
            imageStyle={imageStyle}
            imageHeight={imageHeight}
            translateYDown={translateYDown}
            translateYUp={translateYUp}
            scale={scale}
            blurhash={blurhash}
          />
          {children}
        </Animated.ScrollView>
        <AnimatedNavbar
          headerElevation={headerElevation}
          headerHeight={headerNavHeight}
          scroll={scroll}
          imageHeight={imageHeight}
          OverflowHeaderComponent={HeaderNavbarComponent}
          TopNavbarComponent={TopNavBarComponent}
        />
      </>
    );
  }
);
