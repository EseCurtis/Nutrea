import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function DropdownIcon(props: SvgProps) {
  return (
    <Svg width={16} height={28} viewBox="0 0 16 28" fill="none" {...props}>
      <Path
        d="M13.28 10.06L8.933 5.713a1.324 1.324 0 00-1.866 0L2.72 10.06"
        stroke="#5C5C5C"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.28 17.94l-4.347 4.347a1.324 1.324 0 01-1.866 0L2.72 17.94"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
