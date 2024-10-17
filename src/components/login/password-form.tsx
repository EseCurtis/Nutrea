/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useLogin } from '@/api/auth';
import { useAuth } from '@/core';
import { AuthStepEnum } from '@/core/auth/utils';
import {
  Button,
  ControlledInput,
  Pressable,
  showError,
  Text,
  View,
} from '@/ui';

import { StepTitle } from './step-title';

const schema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password must have 8 or more characters'),
});

type FormType = z.infer<typeof schema>;

export const PasswordForm = () => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const { setStep, setLoginData, signIn, loginData, setUser } = useAuth();

  const { mutate, isPending } = useLogin({
    onSuccess: (e) => {
      signIn({ access: e?.data?.token, refresh: 'dddd' });
      setUser(e?.data?.user);
      router.push('/(app)');
    },
    onError: (e) => {
      showError(e);
    },
  });

  const onSubmit = (data: FormType) => {
    if (loginData?.isNewUser) {
      setLoginData(data);
      setStep(AuthStepEnum.SETUP_PROFILE);
    } else {
      mutate({ identifier: loginData?.email!, password: data?.password });
    }
  };

  return (
    <View className="flex-1 p-4">
      <StepTitle
        title="Password"
        description="Enter the name you would like to go by"
      />
      <View className="my-6">
        <ControlledInput
          control={control}
          name="password"
          // placeholder="•••••••••"
          placeholder="∗∗∗∗∗∗∗∗"
          keyboardType="visible-password"
          className="text-left"
          autoFocus
          secureTextEntry={!showPassword}
          rightItems={
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text className="text-center font-semibold">
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          }
        />
      </View>

      {/* {!loginData?.isNewUser && (
        <Pressable
          onPress={() => {
            resetLoginData();
            router.push('/auth/forgot-password');
          }}
          className="mb-6"
        >
          <Text className="text-center text-primary-400">Forgot password?</Text>
        </Pressable>
      )} */}

      <Button
        testID="login-button"
        className="mt-4"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
        withIcon
      >
        Continue
      </Button>
    </View>
  );
};
