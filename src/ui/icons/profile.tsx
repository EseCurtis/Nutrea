import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

export function ProfileColoredIcon(props: SvgProps) {
  return (
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none" {...props}>
      <Path
        d="M18 33.015c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15z"
        fill="#522FE0"
      />
      <Path
        d="M18 10.41a5.627 5.627 0 00-5.625 5.625c0 3.045 2.385 5.52 5.55 5.61h.27a5.615 5.615 0 005.43-5.61A5.627 5.627 0 0018 10.41z"
        fill="url(#paint0_linear_712_1771)"
      />
      <Path
        d="M28.17 29.04A14.963 14.963 0 0118 33.015c-3.93 0-7.5-1.515-10.17-3.975.36-1.365 1.335-2.61 2.76-3.57 4.095-2.73 10.755-2.73 14.82 0 1.44.96 2.4 2.205 2.76 3.57z"
        fill="url(#paint1_linear_712_1771)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_712_1771"
          x1={18}
          y1={10.41}
          x2={18}
          y2={21.645}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#947EEC" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_712_1771"
          x1={18}
          y1={33.015}
          x2={18}
          y2={23.4225}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#947EEC" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export function ProfileIcon(props: SvgProps) {
  return (
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none" {...props}>
      <Path
        d="M18 33.015c8.284 0 15-6.716 15-15 0-8.285-6.716-15-15-15-8.284 0-15 6.715-15 15 0 8.284 6.716 15 15 15z"
        fill="#F5F5F5"
      />
      <Path
        d="M18 10.41a5.627 5.627 0 00-5.625 5.624c0 3.045 2.385 5.52 5.55 5.61h.27a5.615 5.615 0 005.43-5.61A5.627 5.627 0 0018 10.41z"
        fill="url(#paint0_linear_193_218)"
      />
      <Path
        d="M28.172 29.04a14.963 14.963 0 01-10.17 3.975c-3.93 0-7.5-1.515-10.17-3.975.36-1.365 1.335-2.61 2.76-3.57 4.095-2.73 10.755-2.73 14.82 0 1.44.96 2.4 2.205 2.76 3.57z"
        fill="url(#paint1_linear_193_218)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_193_218"
          x1={18}
          y1={10.4092}
          x2={18}
          y2={21.6442}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#D9D9D9" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_193_218"
          x1={18.002}
          y1={33.0154}
          x2={18.002}
          y2={23.4229}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#D9D9D9" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
