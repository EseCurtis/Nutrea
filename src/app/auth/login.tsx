import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React from 'react';

import { AvatarForm } from '@/components/login/avatar-form';
import { EmailForm } from '@/components/login/email-form';
import { PasswordForm } from '@/components/login/password-form';
import { SetupProfileForm } from '@/components/login/setup-profile-form';
import { StepProgress } from '@/components/login/step-progress';
import { VerifyEmailForm } from '@/components/login/verify-email-form';
import { useAuth } from '@/core';
import { AuthStepEnum } from '@/core/auth/utils';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { AppBar, ScrollView, View } from '@/ui';

export default function Login() {
  useSoftKeyboardEffect();

  const { back } = useRouter();
  const { step, setStep, resetLoginData, loginData } = useAuth();

  const handleBack = () => {
    if (step === AuthStepEnum.EMAIL) {
      back();
      resetLoginData();
    }
    if (step === AuthStepEnum.VERIFY_EMAIL) setStep(AuthStepEnum.EMAIL);
    if (step === AuthStepEnum.PASSWORD) setStep(AuthStepEnum.EMAIL);
    if (step === AuthStepEnum.SETUP_PROFILE) setStep(AuthStepEnum.PASSWORD);
    if (step === AuthStepEnum.AVATAR) setStep(AuthStepEnum.SETUP_PROFILE);
    return;
  };

  return (
    <View className="flex-1">
      <AppBar
        onBack={handleBack}
        title={loginData?.isNewUser && <StepProgress />}
      />
      <ScrollView bounces={false} contentContainerClassName="flex-1">
        <MotiView
          className="flex-1"
          key={step}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 600 }}
        >
          {step === AuthStepEnum.EMAIL && <EmailForm />}
          {step === AuthStepEnum.VERIFY_EMAIL && <VerifyEmailForm />}
          {step === AuthStepEnum.PASSWORD && <PasswordForm />}
          {step === AuthStepEnum.SETUP_PROFILE && <SetupProfileForm />}
          {step === AuthStepEnum.AVATAR && <AvatarForm />}
        </MotiView>
      </ScrollView>
    </View>
  );
}
