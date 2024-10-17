/* eslint-disable max-lines-per-function */
import { MotiView } from 'moti';
import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { TextInput, TextInputProps } from 'react-native';
import { I18nManager, StyleSheet, View } from 'react-native';
import { TextInput as NTextInput } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

import { Text } from './text';

const inputTv = tv({
  slots: {
    container: 'relative',
    label: 'text-grey-100 mb-1 text-lg',
    input:
      'mt-0 h-[70px] rounded-full bg-card px-6 text-center font-sf-pro-bold text-[28px] font-bold text-white',
  },

  variants: {
    focused: {
      true: {
        input: 'border-neutral-400',
      },
    },
    error: {
      true: {
        input: 'border-danger-600 text-center',
        label: 'text-center text-danger-600',
      },
    },
    disabled: {
      true: {
        input: 'bg-neutral-200',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  rightItems?: React.ReactNode;
  rightItemsClassName?: string;
}

type TRule = Omit<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

export type RuleType<T> = { [name in keyof T]: TRule };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

export const Input = React.forwardRef<TextInput, NInputProps>((props, ref) => {
  const {
    label,
    error,
    testID,
    rightItems,
    rightItemsClassName,
    ...inputProps
  } = props;
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocus = React.useCallback(() => setIsFocussed(true), []);

  const styles = React.useMemo(
    () =>
      inputTv({
        error: Boolean(error),
        focused: isFocussed,
        disabled: Boolean(props.disabled),
      }),
    [error, isFocussed, props.disabled]
  );

  return (
    <View className={styles.container()}>
      {label && (
        <Text
          testID={testID ? `${testID}-label` : undefined}
          className={styles.label()}
        >
          {label}
        </Text>
      )}
      <NTextInput
        testID={testID}
        ref={ref}
        placeholderTextColor={'#6C727F'}
        onBlur={onBlur}
        onFocus={onFocus}
        {...inputProps}
        className={twMerge(styles.input(), props?.className)}
        style={StyleSheet.flatten([
          {
            writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
            backgroundColor: '#121212',
          },
          // { textAlign: I18nManager.isRTL ? 'right' : 'left' },
          inputProps.style,
        ])}
      />

      {rightItems && (
        <View
          className={twMerge(
            'absolute right-0 h-full items-center justify-center px-6',
            rightItemsClassName
          )}
        >
          {rightItems}
        </View>
      )}

      {error && (
        <MotiView
          key={error}
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
        >
          <Text
            testID={testID ? `${testID}-error` : undefined}
            className="mt-1 text-center text-sm text-danger-400"
          >
            {error}
          </Text>
        </MotiView>
      )}
    </View>
  );
});

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  return (
    <Input
      ref={field.ref}
      autoCapitalize="none"
      value={(field.value as string) || ''}
      {...inputProps}
      onChangeText={(e) => {
        field.onChange(e);
        inputProps?.onChangeText?.(e);
      }}
      error={fieldState.error?.message}
    />
  );
}
