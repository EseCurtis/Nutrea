import { ImageBackground, View } from "react-native";
import { Text } from "./Text";
import { Defs, LinearGradient, Path, Rect, Stop, Svg } from "react-native-svg";

export function PointRibbon({
  size = 90,
  points,
}: {
  size?: number;
  points?: string;
}) {
  const calcPointTextSiz = size / 4;

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 66 66" fill="none">
        <Rect
          x={32.8936}
          y={0.689688}
          width={45.6427}
          height={45.6427}
          rx={2.74392}
          transform="rotate(44.875 32.894 .69)"
          fill="url(#paint0_linear_4080_21919)"
          stroke="#fff"
          strokeWidth={1.85307}
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_4080_21919"
            x1={32.8965}
            y1={2}
            x2={78.1028}
            y2={3.51491}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#4622D9" />
            <Stop offset={1} stopColor="#6E50F0" />
          </LinearGradient>
        </Defs>
      </Svg>

      <View className="absolute">
        {points ? (
          <Text
            fontWeight="bold"
            className="w-[40px] text-center text-white leading-none"
            style={{
              fontSize: calcPointTextSiz,
            }}
          >
            {points}
          </Text>
        ) : (
          <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <Path
              d="M19.0674 5.46387V7.22388C19.0674 8.96388 18.4874 9.29397 17.5574 9.82397L12.0874 12.9639L6.5874 9.82397C5.6474 9.29397 5.06738 8.96388 5.06738 7.22388V5.46387C5.06738 4.63387 5.73738 3.96387 6.56738 3.96387H17.5674C18.3974 3.96387 19.0674 4.63387 19.0674 5.46387Z"
              fill="white"
            />
            <Path
              opacity="0.4"
              d="M19.0674 18.7039V20.4639C19.0674 21.2939 18.3974 21.9639 17.5674 21.9639H6.56738C5.73738 21.9639 5.06738 21.2939 5.06738 20.4639V18.7039C5.06738 16.9639 5.6474 16.6338 6.5874 16.1038L12.0874 12.9639L17.5574 16.1038C18.4874 16.6338 19.0674 16.9639 19.0674 18.7039Z"
              fill="white"
            />
          </Svg>
        )}
      </View>
    </View>
  );
}
