import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function ChevronRightIcon(props: SvgProps) {
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" {...props}>
      <Path
        d="M8.91 20.42l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.58"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
    </Svg>
  );
}

export function ChevronRightFilledIcon(props: SvgProps) {
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 12.5C1.25 6.563 6.063 1.75 12 1.75S22.75 6.563 22.75 12.5 17.937 23.25 12 23.25 1.25 18.437 1.25 12.5zm11.21.063l.026-.063a1.174 1.174 0 00-.026-.063 3.424 3.424 0 00-.262-.454 12.873 12.873 0 00-.955-1.225c-.36-.416-.722-.804-.995-1.088l-.449-.456a1 1 0 011.402-1.428l.489.498c.289.3.677.715 1.067 1.167.386.448.793.951 1.108 1.427.157.237.305.488.417.736.104.23.218.544.218.886 0 .342-.114.656-.218.887-.112.247-.26.498-.417.735-.315.476-.722.98-1.108 1.427-.39.452-.778.867-1.067 1.167l-.49.498a1 1 0 11-1.4-1.427l.448-.457c.273-.284.635-.672.995-1.088.364-.421.707-.851.955-1.225.123-.187.21-.34.262-.454z"
        fill="#fff"
      />
    </Svg>
  );
}

export function ChevronDownIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M2.72 5.94l4.347 4.347a1.324 1.324 0 001.866 0L13.28 5.94"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
    </Svg>
  );
}

export function ChevronDownFilledIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.25c5.937 0 10.75 4.813 10.75 10.75S17.937 22.75 12 22.75 1.25 17.937 1.25 12 6.063 1.25 12 1.25zm-.063 11.21l.063.026.063-.026c.115-.052.267-.139.454-.262.373-.248.804-.591 1.225-.955.416-.36.804-.722 1.088-.995l.457-.449a1 1 0 011.426 1.402l-.497.489c-.3.289-.715.677-1.167 1.067-.448.386-.951.793-1.427 1.108a5.37 5.37 0 01-.736.417c-.23.104-.544.218-.886.218-.342 0-.656-.114-.887-.218a5.364 5.364 0 01-.735-.417c-.476-.315-.98-.722-1.427-1.108-.452-.39-.867-.778-1.167-1.067l-.498-.49a1 1 0 111.427-1.4l.457.448c.284.273.672.635 1.088.995.421.364.851.707 1.225.955.187.123.34.21.454.262z"
        fill="#fff"
      />
    </Svg>
  );
}
