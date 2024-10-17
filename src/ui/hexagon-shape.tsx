import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface HexagonShapeProps {
  size?: number;
  color?: string;
  text?: string;
  textColor?: string;
}

export const HexagonShape: React.FC<HexagonShapeProps> = ({
  size = 73,
  color = '#522FE0',
  text,
  textColor = '#FFFFFF',
}) => {
  const strokeWidth = 4;

  return (
    <View className="relative items-center justify-center">
      <Svg width={size} height={size} viewBox="0 0 73 73" fill="none">
        <Defs>
          <LinearGradient
            id="paint0_linear_232_257"
            x1="36.5"
            y1="0"
            x2="36.5"
            y2="73"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#010102" stopOpacity="0" />
            <Stop offset="1" stopColor={color} />
          </LinearGradient>
        </Defs>
        <Path
          d="M33.0483 1.95642C35.1894 0.742835 37.8106 0.742833 39.9517 1.95642L52.3775 8.99936L64.6898 16.239C66.8113 17.4864 68.1219 19.7564 68.1415 22.2175L68.255 36.5L68.1415 50.7825C68.1219 53.2436 66.8113 55.5136 64.6898 56.761L52.3775 64.0006L39.9517 71.0436C37.8106 72.2572 35.1894 72.2572 33.0483 71.0436L20.6225 64.0006L8.31024 56.7611C6.18868 55.5136 4.8781 53.2436 4.85853 50.7825L4.745 36.5L4.85853 22.2175C4.8781 19.7564 6.18867 17.4864 8.31023 16.239L20.6225 8.99936L33.0483 1.95642Z"
          fill="url(#paint0_linear_232_257)"
        />
        <Path
          d="M39.4586 3.97586L51.3774 10.7315L63.1874 17.6757C65.0059 18.745 66.1293 20.6907 66.146 22.8001L66.2549 36.5L66.146 50.1998C66.1293 52.3093 65.0059 54.255 63.1874 55.3243L51.3773 62.2686L39.4586 69.0241C37.6234 70.0644 35.3767 70.0644 33.5414 69.0241L21.6226 62.2686L9.81257 55.3243C7.99409 54.255 6.87073 52.3093 6.85396 50.1998L6.74506 36.5L6.85396 22.8002C6.87073 20.6907 7.99408 18.745 9.81257 17.6757L21.6225 10.7315L33.5414 3.97586C35.3766 2.93564 37.6234 2.93564 39.4586 3.97586Z"
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </Svg>

      <Text
        className="absolute z-10 font-946-latin italic"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          fontFamily: '946-latin',
          fontSize: size * 0.3,
          color: textColor,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
