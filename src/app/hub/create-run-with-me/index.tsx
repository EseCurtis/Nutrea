import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';

import {
  DistanceSlider,
  MetricSelector,
  OccurenceSelector,
  TypeSelector,
} from '@/components/hub/create-run-with-me';
import { PrivacySelector } from '@/components/hub/create-run-with-me/privacy-selector';
import { SelectClubButton } from '@/components/hub/create-run-with-me/select-club-button';
import { AppBar, BottomNotch, Button, View } from '@/ui';

export default function CreateRunWithMe() {
  return (
    <LinearGradient colors={['#141414', '#000000']} className="flex-1">
      <AppBar
        title="Run With Me"
        hideNotch
        backType="close"
        onBack={router.back}
      />

      <View className="flex-1 gap-8 py-2">
        <MetricSelector />
        <DistanceSlider />
        <View className="flex-row items-center justify-between px-6">
          <OccurenceSelector />
          <TypeSelector />
        </View>
        <View className="gap-4 px-6">
          <PrivacySelector />
          <SelectClubButton />
        </View>
      </View>
      <View className="px-6">
        <Button
          withIcon
          onPress={() => router.push('/hub/create-run-with-me/success')}
        >
          Create Challenge
        </Button>
      </View>
      <BottomNotch />
    </LinearGradient>
  );
}
