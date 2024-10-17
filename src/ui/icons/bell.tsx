import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function BellIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M4.41 11.452a7.601 7.601 0 0115.18 0c.01.172.016.337.023.496.022.542.041 1.013.14 1.465.117.54.334.964.775 1.295a3.055 3.055 0 011.222 2.445c0 1.381-1.087 2.597-2.55 2.597H4.8c-1.463 0-2.55-1.216-2.55-2.597 0-.962.453-1.868 1.222-2.445.441-.33.658-.755.775-1.295.099-.452.118-.923.14-1.465.007-.159.013-.324.022-.496z"
        fill="#fff"
        {...props}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.529 1.374C10.974 1.083 11.517 1 12 1c.483 0 1.026.083 1.471.374.494.324.779.847.779 1.501 0 .596-.233 1.219-.587 1.696-.35.469-.921.929-1.663.929s-1.314-.46-1.663-.93c-.354-.476-.587-1.099-.587-1.695 0-.654.285-1.177.779-1.5z"
        fill="#fff"
        {...props}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 18a1 1 0 011 1 2 2 0 104 0 1 1 0 112 0 4 4 0 01-8 0 1 1 0 011-1z"
        fill="#fff"
        fillOpacity={0.52}
        {...props}
      />
    </Svg>
  );
}
