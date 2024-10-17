/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { inAppWallet, preAuthenticate } from 'thirdweb/wallets/in-app';
import * as z from 'zod';

import { useAuth, useCountdown } from '@/core';
import { AuthStepEnum } from '@/core/auth/utils';
import { chain, client } from '@/core/thirdweb';
import { Button, ControlledInput, Pressable, Text, View } from '@/ui';

import { StepTitle } from './step-title';

const schema = z.object({
  otp: z
    .string({
      required_error: 'OTP is required',
    })
    .min(6, 'Invalid otp')
    .max(6, 'Invalid otp'),
});

type FormType = z.infer<typeof schema>;

export const VerifyEmailForm = () => {
  const { handleSubmit, control, setError } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

  const [sendingOtp, setSendingOtp] = useState(false);
  const { setStep, loginData, setLoginData } = useAuth();
  const { countdown, finished, resetCountdown } = useCountdown(30);

  const sendEmailOTP = async () => {
    resetCountdown();
    setSendingOtp(true);
    await preAuthenticate({
      client,
      strategy: 'email',
      email: loginData?.email!,
    });
    setStep(AuthStepEnum.VERIFY_EMAIL);
    setSendingOtp(false);
  };

  const handleVerifyEmail = async (otp: string) => {
    setIsVerifyingEmail(true);
    const wallet = inAppWallet({
      smartAccount: {
        chain: chain,
        sponsorGas: true,
      },
    });

    try {
      await wallet.connect({
        client,
        strategy: 'email',
        email: loginData?.email!,
        verificationCode: otp,
        chain,
      });
    } catch (error: any) {
      setIsVerifyingEmail(false);
      setError('otp', { message: 'Invalid OTP' });
    }

    if (wallet) {
      const account = await wallet.getAccount();
      if (account) {
        setLoginData({ walletAddress: account?.address });
        setStep(AuthStepEnum.PASSWORD);
      }
    }
    setIsVerifyingEmail(false);
  };

  const onSubmit = (data: FormType) => {
    handleVerifyEmail(data.otp);
  };

  return (
    <View className="flex-1 p-4">
      <StepTitle
        title="Verify Email"
        description={`Enter the 6-digit code sent to ${
          loginData?.email?.split('@')[0]?.slice(0, 3) +
          '****' +
          loginData?.email?.split('@')[1]
        }`}
      />
      <View className="my-6">
        <ControlledInput
          control={control}
          name="otp"
          placeholder="000000"
          keyboardType="number-pad"
          style={styles.input}
          autoFocus
          maxLength={6}
        />
      </View>

      <Pressable className="mb-6" onPress={() => sendEmailOTP()}>
        <Text className="text-center font-medium text-primary-400">
          {sendingOtp
            ? 'Resending otp ...'
            : `Resend Code${finished ? '' : ` (${countdown})`}`}
        </Text>
      </Pressable>

      <Button
        testID="login-button"
        className="mt-4"
        onPress={handleSubmit(onSubmit)}
        disabled={sendingOtp}
        loading={isVerifyingEmail}
        withIcon
      >
        Continue
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: { letterSpacing: 2 },
});
