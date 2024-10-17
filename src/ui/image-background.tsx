import { ImageBackground as NImage } from 'expo-image';
import { cssInterop } from 'nativewind';
import * as React from 'react';

import type { ImgProps } from './image';

cssInterop(NImage, { className: 'style' });

export const ImageBackground = ({
  style,
  className,
  placeholder = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
  ...props
}: ImgProps) => {
  return (
    <NImage
      className={className}
      placeholder={placeholder}
      style={style}
      {...props}
    />
  );
};
