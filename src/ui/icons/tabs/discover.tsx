import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function DiscoverIcon(props: SvgProps) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <Path
        d="M15.876 1.338c.824.352 1.387 1.185 1.387 2.182v7.896c0 .128.105.233.234.233h3.619c1.033 0 1.745.697 2.038 1.43.293.73.254 1.67-.33 2.42l-8.165 10.48c-.655.84-1.685 1.044-2.535.682-.825-.351-1.388-1.185-1.388-2.181v-7.896a.233.233 0 00-.234-.233H6.883c-1.033 0-1.745-.698-2.038-1.43a2.455 2.455 0 01.331-2.42l8.165-10.48c.655-.841 1.684-1.045 2.535-.683z"
        fill="#636363"
        {...props}
      />
    </Svg>
  );
}
