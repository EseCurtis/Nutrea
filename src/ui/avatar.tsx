import type { ImageProps } from 'expo-image';
import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';
import React from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { ProfileColoredIcon } from './icons';

const avatar = tv({
  slots: {
    container: 'items-center justify-center rounded-full bg-primary-500',
  },

  variants: {
    variant: {
      default: {
        container: 'h-[32px] w-[32px] bg-white',
      },
      small: {
        container: 'h-[32px] w-[32px] bg-white',
      },
      medium: {
        container: 'h-[44px] w-[44px] bg-white',
      },
      large: {
        container: 'h-[68px] w-[68px] bg-white',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type AvatarVariant = VariantProps<typeof avatar>;

interface Props extends AvatarVariant, Omit<ImageProps, 'disabled'> {
  className?: string;
}

cssInterop(Image, { className: 'style' });

export function Avatar({ className, variant, ...props }: Props) {
  const styles = React.useMemo(() => avatar({ variant }), [variant]);
  const iconSize = variant === 'large' ? 68 : variant === 'medium' ? 44 : 32;

  if (!props.source)
    return <ProfileColoredIcon width={iconSize} height={iconSize} />;

  return <Image className={styles.container({ className })} {...props} />;
}
