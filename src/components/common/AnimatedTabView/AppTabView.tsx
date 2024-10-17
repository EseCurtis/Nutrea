import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createRef,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  View,
  Text,
  FlatList,
} from "react-native";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

const { width, height } = Dimensions.get("window");

export const SIZES = {
  base: 8,
  font: 14,
  radius: width * 0.03,
  padding: 24,
  width,
  height,
};

interface TabIndicatorProps {
  //   measureLayout: { height: number; width: number; x: number; y: number }[];
  scrollX: Animated.Value;
  OptionTabs: {
    ref: React.RefObject<unknown>;
    id: number;
    title: string;
  }[];
}

export const TabIndicator = ({
  //   measureLayout,
  scrollX,
  OptionTabs,
}: TabIndicatorProps) => {
  const inputRange = OptionTabs.map((_: any, i: number) => i * SIZES.width);

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [0, SIZES.width * 0.47],
    // outputRange: measureLayout.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: (SIZES.width - SIZES.radius * 2) / 2,
        borderRadius: 40,
        backgroundColor: "#4622D9",
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({
  scrollX,
  onOptionTabPress,
  OptionTabs,
  displayedIndex,
  setDisplayedIndex,
}: {
  scrollX: Animated.Value;
  onOptionTabPress: (optIndex: number) => void;
  OptionTabs: any[];
  displayedIndex: number;
  setDisplayedIndex: Dispatch<SetStateAction<number>>;
}) => {
  //   const [measureLayout, setMeasureLayout] = useState<
  //     { height: number; width: number; x: number; y: number }[]
  //   >([]);
  const containerRef = useRef<View>();

  //   useEffect(() => {
  // let ml: { height: number; width: number; x: number; y: number }[] = [];
  // OptionTabs.forEach((eachTab: any) => {
  //   eachTab?.ref?.current?.measureLayout(
  //     containerRef.current,
  //     (x: number, y: number, width: number, height: number) => {
  //       // console.log(x, y, width, height);

  //       ml.push({
  //         x,
  //         y,
  //         width,
  //         height,
  //       });
  //       // console.log(ml, "PPPOP");

  //       if (ml.length === OptionTabs.length) {
  //         // console.log(ml, "OPKSK");
  //         setMeasureLayout(ml);
  //       }
  //     }
  //   );
  // });
  // console.log(containerRef?.current);
  //   }, [containerRef?.current]);

  function colorSelect(index: number) {
    if (displayedIndex === index) return "#fff";
  }

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: "row",
      }}
    >
      {/*Tab Indicator*/}
      {/* {measureLayout.length > 0 && ( */}
      <TabIndicator
        //   measureLayout={measureLayout}
        scrollX={scrollX}
        OptionTabs={OptionTabs}
      />
      {/* )} */}

      {/*Tabs*/}

      {OptionTabs.map((item: any, index: number) => {
        return (
          <Pressable
            key={index.toString()}
            onPress={() => {
              setDisplayedIndex(index);
              onOptionTabPress(index);
            }}
            style={{
              flex: 1,
            }}
          >
            <View
              ref={item?.ref}
              style={{
                alignItems: "center",
                justifyContent: "center",
                // height: 30,
                height: SIZES.height * 0.037,
                alignSelf: "center",
                // position: "absolute",
              }}
            >
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                  color: colorSelect(index),
                  alignSelf: "center",
                  fontSize: 14,
                  fontFamily: "GreycliffCFBold",
                  textTransform: "capitalize",
                }}
              >
                {item.title}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

type tabOptsProps = {
  id: number;
  title: string;
  view: ReactNode;
}[];

export const AppTabView = ({
  renderItem,
  headerComponent,
}: {
  renderItem: tabOptsProps;
  headerComponent: ReactNode;
}) => {
  const VisibleTabs = renderItem.map((tabs) => ({
    ...tabs,
    ref: createRef<FlatList>(),
  }));
  const scrollX = useRef(new Animated.Value(0)).current;

  const optionTabScrollViewRef = useRef<Animated.FlatList<any>>(null);

  const [displayedIndex, setDisplayedIndex] = useState(0);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const onOptionTabPress = useCallback((optIndex: number) => {
    optionTabScrollViewRef?.current?.scrollToOffset({
      offset: optIndex * SIZES.width,
    });
  }, []);

  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.height * 0.04,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius * 5,
          backgroundColor: isDark ? "#000" : "#fff",
        }}
      >
        <Tabs
          scrollX={scrollX}
          onOptionTabPress={onOptionTabPress}
          OptionTabs={VisibleTabs}
          {...{ displayedIndex, setDisplayedIndex }}
        />
      </View>
    );
  }

  function renderList() {
    return (
      <Animated.FlatList
        ref={optionTabScrollViewRef}
        data={renderItem}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment={"center"}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
            listener: ({ nativeEvent }: any) => {
              const contentOffset = nativeEvent.contentOffset.x;
              const itemWidth = SIZES.width;
              const currentIndex = Math.floor(
                (contentOffset + itemWidth * 0.5) / itemWidth
              );
              setDisplayedIndex(currentIndex < 0 ? 0 : currentIndex);
            },
          }
        )}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
                backgroundColor: index === 0 ? "cyan" : "brown",
              }}
            >
              {item.view}
            </View>
          );
        }}
      />
    );
  }

  return (
    <>
      {headerComponent}
      {renderTabBar()}
      {renderList()}
    </>
  );
};
