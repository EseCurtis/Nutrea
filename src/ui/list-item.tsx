import React from 'react';
import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface Props {
  leftItem?: React.JSX.Element;
  rightItem?: React.JSX.Element;
  title?: string;
  description?: string;
  titleClassName?: View['props']['className'];
  descriptionClassName?: View['props']['className'];
  containerClassName?: View['props']['className'];
}

export function ListItem({
  leftItem,
  rightItem,
  title,
  description,
  titleClassName,
  descriptionClassName,
  containerClassName,
}: Props) {
  return (
    <View
      className={twMerge(
        'flex-row items-center justify-between',
        containerClassName
      )}
    >
      <View className="flex-row items-center gap-4">
        {leftItem}
        <View className="gap-1">
          <Text
            className={twMerge(
              'text-[18px] font-semibold text-white',
              titleClassName
            )}
          >
            {title}
          </Text>
          {description && (
            <Text
              className={twMerge(
                'text-base font-medium text-[#6C727F]',
                descriptionClassName
              )}
            >
              {description}
            </Text>
          )}
        </View>
      </View>

      {rightItem}
    </View>
  );
}
