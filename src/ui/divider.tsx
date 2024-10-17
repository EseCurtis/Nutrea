import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export function Divider(props: ViewProps) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <View
      {...props}
      className={twMerge('w-full h-px bg-cardTint', props.className)}
    />
  );
}
