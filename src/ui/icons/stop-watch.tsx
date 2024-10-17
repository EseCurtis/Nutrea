import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function StopWatch(props: SvgProps) {
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" {...props}>
      <Path
        opacity={0.4}
        d="M12 22.5a8.67 8.67 0 100-17.34 8.67 8.67 0 000 17.34z"
        fill="#FF9A23"
        {...props}
      />
      <Path
        d="M12 14.25c-.41 0-.75-.34-.75-.75v-5c0-.41.34-.75.75-.75s.75.34.75.75v5c0 .41-.34.75-.75.75zM14.89 3.95H9.11c-.4 0-.72-.32-.72-.72 0-.4.32-.73.72-.73h5.78c.4 0 .72.32.72.72 0 .4-.32.73-.72.73z"
        fill="#FF9A23"
        {...props}
      />
    </Svg>
  );
}
