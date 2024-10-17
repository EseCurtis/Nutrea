import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { preAuthenticate } from 'thirdweb/wallets/in-app';
import * as z from 'zod';

import { useCheckEmail } from '@/api/auth';
import { useAuth } from '@/core';
import { AuthStepEnum } from '@/core/auth/utils';
import { client } from '@/core/thirdweb';
import { Button, ControlledInput, View } from '@/ui';

import { SocialButtons } from './social-buttons';
import { StepTitle } from './step-title';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
});

type FormType = z.infer<typeof schema>;

export const EmailForm = () => {
  const { mutate, isPending } = useCheckEmail();
  const { setStep, setLoginData, loginData } = useAuth();
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: loginData?.email,
    },
  });

  const [sendingOtp, setSendingOtp] = useState(false);

  const sendEmailOTP = async (email: string) => {
    setSendingOtp(true);
    await preAuthenticate({
      client,
      strategy: 'email',
      email,
    });
    setStep(AuthStepEnum.VERIFY_EMAIL);
    setSendingOtp(false);
  };

  const onSubmit = (data: FormType) => {
    mutate(data, {
      onSuccess: () => {
        sendEmailOTP(data.email);
        setLoginData({ email: data.email, isNewUser: true });
      },
      onError: () => {
        setStep(AuthStepEnum.PASSWORD);
        setLoginData({ email: data.email, isNewUser: false });
      },
    });
  };

  return (
    <View className="flex-1 p-4">
      <StepTitle
        title="What’s your email?"
        description="We’ll send a code to this email to verify your sign in"
      />
      <View className="my-6">
        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          placeholder="address@email.com"
          keyboardType="email-address"
          autoFocus
        />
      </View>
      <Button
        testID="login-button"
        className="mt-4"
        onPress={handleSubmit(onSubmit)}
        loading={isPending || sendingOtp}
        withIcon
      >
        Continue
      </Button>

      <SocialButtons />
    </View>
  );
};
