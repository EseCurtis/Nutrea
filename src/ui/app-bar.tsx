import React from 'react';
import type { ViewProps } from 'react-native';
import { Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { FocusAwareStatusBar } from './focus-aware-status-bar';
import { BackIcon, CloseIcon } from './icons';
import { TopNotch } from './notch';
import { Text } from './text';

interface Props extends ViewProps {
  title?: string | React.ReactNode;
  onBack?: () => void;
  rightItems?: React.ReactNode;
  leftItems?: React.ReactNode;
  backType?: 'close' | 'back';
  hideNotch?: boolean;
}

export const AppBar = ({
  className = '',
  title,
  onBack,
  rightItems,
  leftItems,
  backType = 'back',
  hideNotch,
  ...props
}: Props) => {
  const containerStyle = React.useMemo(
    () =>
      twMerge(
        'flex-row relative items-center h-16 w-full justify-center',
        className
      ),
    [className]
  );

  return (
    <View className="z-50">
      <FocusAwareStatusBar />
      {!hideNotch && <TopNotch />}

      <View className={containerStyle} {...props}>
        <View className="absolute left-0">
          {leftItems ? (
            <View className="flex-row items-center py-4 pl-6">{leftItems}</View>
          ) : (
            onBack && (
              <Pressable onPress={onBack} className="py-4 pl-6">
                {backType === 'back' ? <BackIcon /> : <CloseIcon />}
              </Pressable>
            )
          )}
        </View>

        <Text className="text-xl font-medium">{title}</Text>

        {rightItems && (
          <View className="absolute right-0 flex-row items-center gap-4 py-4 pr-6">
            {rightItems}
          </View>
        )}
      </View>
    </View>
  );
};
