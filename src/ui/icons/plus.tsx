import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function PlusIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.6 2.6a1 1 0 011 1V9H16a1 1 0 110 2h-5.4v5.4a1 1 0 01-2 0V11H3.2a1 1 0 010-2h5.4V3.6a1 1 0 011-1z"
        fill="#000"
        {...props}
      />
    </Svg>
  );
}
