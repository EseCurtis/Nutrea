import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React from 'react';
import { View } from 'react-native';

import { useAuth } from '@/core';
import { AuthStepEnum } from '@/core/auth/utils';
import { Text } from '@/ui';

export function StepProgress() {
  const { step } = useAuth();

  const progressTitle = (() => {
    switch (step) {
      case AuthStepEnum.PASSWORD:
        return 'Halfway there';
      case AuthStepEnum.SETUP_PROFILE:
        return 'Almost done!';
      case AuthStepEnum.AVATAR:
        return 'Final step!';
      default:
        return null;
    }
  })();

  const progressPercent = (() => {
    switch (step) {
      case AuthStepEnum.EMAIL:
        return 10;
      case AuthStepEnum.VERIFY_EMAIL:
        return 30;
      case AuthStepEnum.PASSWORD:
        return 50;
      case AuthStepEnum.SETUP_PROFILE:
        return 70;
      case AuthStepEnum.AVATAR:
        return 90;
      default:
        return 0;
    }
  })();

  if (!progressTitle) return null;

  return (
    <View className="relative h-[40px] w-[132px] items-center justify-center overflow-hidden rounded-full bg-card">
      <MotiView
        from={{ width: '0%' }}
        animate={{ width: `${progressPercent}%` }}
        transition={{ duration: 1000 }}
        id={`percent-${progressPercent}`}
        className="absolute left-0 h-full"
      >
        <LinearGradient
          colors={['#522FE0', '#2E0FAA', '#522FE0']}
          className="h-full w-full"
        />
      </MotiView>
      <MotiView
        key={progressTitle}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 600 }}
        className="relative z-10"
      >
        <Text className="text-[17px] font-medium">{progressTitle}</Text>
      </MotiView>
    </View>
  );
}
