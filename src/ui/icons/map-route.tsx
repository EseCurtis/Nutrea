import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function MapRoute(props: SvgProps) {
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" {...props}>
      <Path
        opacity={0.4}
        d="M5.47 9.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM17 15.5h3c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2h-3c-1.1 0-2-.9-2-2v-3c0-1.1.9-2 2-2z"
        fill="#3FFF5D"
        {...props}
      />
      <Path
        d="M12 20.25H9.32c-1.16 0-2.17-.7-2.57-1.78-.41-1.08-.11-2.27.76-3.04l7.99-6.99c.48-.42.49-.99.35-1.38-.15-.39-.53-.81-1.17-.81H12c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.68c1.16 0 2.17.7 2.57 1.78.41 1.08.11 2.27-.76 3.04L8.5 16.56c-.48.42-.49.99-.35 1.38.15.39.53.81 1.17.81H12c.41 0 .75.34.75.75s-.34.75-.75.75zM18.51 20c-.55 0-1-.45-1-1s.44-1 1-1h.01c.55 0 1 .45 1 1s-.45 1-1.01 1zM5.51 7c-.55 0-1-.45-1-1s.44-1 1-1h.01c.55 0 1 .45 1 1s-.45 1-1.01 1z"
        fill="#3FFF5D"
        {...props}
      />
    </Svg>
  );
}
