import React from 'react';
import type { TextProps, TextStyle } from 'react-native';
import { I18nManager, StyleSheet, Text as NNText } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { TxKeyPath } from '@/core/i18n';
import { translate } from '@/core/i18n';

interface Props extends TextProps {
  className?: string;
  tx?: TxKeyPath;
}

export const Text = ({
  className = '',
  style,
  tx,
  children,
  ...props
}: Props) => {
  const fontClass =
    className.split(' ').find((cls) => fontFamilyMapping[cls]) ??
    'font-regular';

  const textStyle = React.useMemo(() => {
    return twMerge(
      'text-base text-white font-normal',
      className,
      fontClass ? `font-[${fontFamilyMapping[fontClass]}]` : 'font-regular'
    );
  }, [className, fontClass]);

  const nStyle = React.useMemo(
    () =>
      StyleSheet.flatten([
        {
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
          fontFamily: fontFamilyMapping[fontClass] || 'sf-pro-regular',
        },
        style,
      ]) as TextStyle,
    [style, fontClass]
  );

  return (
    <NNText className={textStyle} style={nStyle} {...props}>
      {tx ? translate(tx) : children}
    </NNText>
  );
};

const fontFamilyMapping: Record<string, string> = {
  'font-black': 'sf-pro-black',
  'font-black-italic': 'sf-pro-black-italic',
  'font-bold': 'sf-pro-bold',
  'font-bold-italic': 'sf-pro-bold-italic',
  'font-heavy': 'sf-pro-heavy',
  'font-heavy-italic': 'sf-pro-heavy-italic',
  'font-light': 'sf-pro-light',
  'font-light-italic': 'sf-pro-light-italic',
  'font-medium': 'sf-pro-medium',
  'font-medium-italic': 'sf-pro-medium-italic',
  'font-regular': 'sf-pro-regular',
  'font-regular-italic': 'sf-pro-regular-italic',
  'font-semibold': 'sf-pro-semibold',
  'font-semibold-italic': 'sf-pro-semibold-italic',
  'font-thin': 'sf-pro-thin',
  'font-thin-italic': 'sf-pro-thin-italic',
  'font-946-latin': '946-latin',
};
