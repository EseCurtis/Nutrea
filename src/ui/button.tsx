import React from 'react';
import type { PressableProps, View } from 'react-native';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { twMerge } from 'tailwind-merge';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

const button = tv({
  slots: {
    container: 'flex flex-row items-center justify-center rounded-full px-4',
    label: 'text-base font-semibold',
    indicator: 'h-6 text-white',
  },

  variants: {
    variant: {
      default: {
        container: 'bg-white',
        label: 'text-black',
        indicator: 'text-black',
      },
      secondary: {
        container: 'bg-primary-500',
        label: 'text-white',
        indicator: 'text-white',
      },
      outline: {
        container: 'border border-neutral-400',
        label: 'text-black',
        indicator: 'text-black',
      },
      destructive: {
        container: 'bg-red-600',
        label: 'text-white',
        indicator: 'text-white',
      },
      ghost: {
        container: 'bg-transparent',
        label: 'text-black underline',
        indicator: 'text-black',
      },
      link: {
        container: 'bg-transparent',
        label: 'text-black',
        indicator: 'text-black',
      },
    },
    size: {
      default: {
        container: 'h-16 px-6',
        label: 'text-base',
      },
      lg: {
        container: 'h-12 px-8',
        label: 'text-xl',
      },
      sm: {
        container: 'h-8 px-3',
        label: 'text-sm',
        indicator: 'h-2',
      },
      icon: { container: 'h-9 w-9' },
    },
    disabled: {
      true: {
        container: 'bg-neutral-300',
        label: 'text-neutral-600',
        indicator: 'text-neutral-400',
      },
    },
    fullWidth: {
      true: {
        container: '',
      },
      false: {
        container: 'self-center',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    disabled: false,
    fullWidth: true,
    size: 'default',
  },
});

type ButtonVariants = VariantProps<typeof button>;
interface Props extends ButtonVariants, Omit<PressableProps, 'disabled'> {
  loading?: boolean;
  className?: string;
  textClassName?: string;
  withIcon?: boolean;
  leftItems?: React.ReactNode;
}

export const Button = React.forwardRef<View, Props>(
  (
    {
      loading = false,
      variant = 'default',
      disabled = false,
      size = 'default',
      className = '',
      testID,
      textClassName = '',
      withIcon,
      leftItems,
      ...props
    },
    ref
  ) => {
    const styles = React.useMemo(
      () => button({ variant, disabled, size }),
      [variant, disabled, size]
    );

    return (
      <Pressable
        disabled={disabled || loading}
        className={twMerge(
          styles.container({ className }),
          withIcon ? 'justify-between' : ''
        )}
        {...props}
        ref={ref}
        testID={testID}
      >
        {leftItems && leftItems}
        {withIcon ? (
          <>
            <Text
              testID={testID ? `${testID}-label` : undefined}
              className={styles.label({ className: textClassName })}
            >
              {props.children as any}
            </Text>

            {loading ? (
              <ActivityIndicator
                size="small"
                className={styles.indicator()}
                testID={testID ? `${testID}-activity-indicator` : undefined}
              />
            ) : (
              <ChevronRight
                color={variant === 'secondary' ? 'white' : '#1E212C'}
              />
            )}
          </>
        ) : loading ? (
          <ActivityIndicator
            size="small"
            className={styles.indicator()}
            testID={testID ? `${testID}-activity-indicator` : undefined}
          />
        ) : (
          <Text
            testID={testID ? `${testID}-label` : undefined}
            className={styles.label({ className: textClassName })}
          >
            {props.children as any}
          </Text>
        )}
      </Pressable>
    );
  }
);

export const ChevronRight = ({ color = '#1E212C' }: { color?: string }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 12c0 5.937 4.813 10.75 10.75 10.75S22.75 17.937 22.75 12 17.937 1.25 12 1.25 1.25 6.063 1.25 12zm11.21-.063l.026.063a1.174 1.174 0 01-.026.063 3.424 3.424 0 01-.262.454c-.248.373-.591.804-.955 1.225-.36.416-.722.804-.995 1.088l-.449.457a1 1 0 001.402 1.426l.489-.497c.289-.3.677-.715 1.067-1.167.386-.448.793-.951 1.108-1.427a5.37 5.37 0 00.417-.736c.104-.23.218-.544.218-.886 0-.342-.114-.656-.218-.887a5.364 5.364 0 00-.417-.735c-.315-.476-.722-.98-1.108-1.427-.39-.452-.778-.867-1.067-1.167l-.49-.498a1 1 0 10-1.4 1.427l.448.457c.273.284.635.672.995 1.088.364.421.707.851.955 1.225.123.187.21.34.262.454z"
        fill={color}
      />
    </Svg>
  );
};
