/* eslint-disable max-lines-per-function */
import { useFonts } from 'expo-font';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { useLoggedInUser } from '@/api/auth';
import { useAuth, useIsFirstTime, useTabItems } from '@/core';
import { useHapticFeedback } from '@/core/hooks/use-haptic-feedback';
import { colors } from '@/ui';

export default function TabLayout() {
  const { status, setUser, token } = useAuth();
  const [isFirstTime] = useIsFirstTime();
  const { items } = useTabItems();
  const { haptic } = useHapticFeedback();

  const [loaded] = useFonts({
    '946-latin': require('@/assets/fonts/946Latin.ttf'),
    'sf-pro-black': require('@/assets/fonts/SF-Pro-Display-Black.ttf'),
    'sf-pro-black-italic': require('@/assets/fonts/SF-Pro-Display-BlackItalic.ttf'),
    'sf-pro-bold': require('@/assets/fonts/SF-Pro-Display-Bold.ttf'),
    'sf-pro-bold-italic': require('@/assets/fonts/SF-Pro-Display-BoldItalic.ttf'),
    'sf-pro-heavy': require('@/assets/fonts/SF-Pro-Display-Heavy.ttf'),
    'sf-pro-heavy-italic': require('@/assets/fonts/SF-Pro-Display-HeavyItalic.ttf'),
    'sf-pro-light': require('@/assets/fonts/SF-Pro-Display-Light.ttf'),
    'sf-pro-light-italic': require('@/assets/fonts/SF-Pro-Display-LightItalic.ttf'),
    'sf-pro-medium': require('@/assets/fonts/SF-Pro-Display-Medium.ttf'),
    'sf-pro-medium-italic': require('@/assets/fonts/SF-Pro-Display-MediumItalic.ttf'),
    'sf-pro-regular': require('@/assets/fonts/SF-Pro-Display-Regular.ttf'),
    'sf-pro-regular-italic': require('@/assets/fonts/SF-Pro-Display-RegularItalic.ttf'),
    'sf-pro-semibold': require('@/assets/fonts/SF-Pro-Display-Semibold.ttf'),
    'sf-pro-semibold-italic': require('@/assets/fonts/SF-Pro-Display-SemiboldItalic.ttf'),
    'sf-pro-thin': require('@/assets/fonts/SF-Pro-Display-Thin.ttf'),
    'sf-pro-thin-italic': require('@/assets/fonts/SF-Pro-Display-ThinItalic.ttf'),
  });

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  const { mutate } = useLoggedInUser({
    onSuccess: (e) => setUser(e.data),
    onError: (e) => console.log(e.config),
  });

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
        if (token) {
          mutate({});
        }
      }, 1000);
    }
  }, [hideSplash, status, loaded, mutate, token]);

  if (isFirstTime && status !== 'signIn') {
    return <Redirect href="/onboarding" />;
  }

  if (status === 'signOut') {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.black,
          borderTopWidth: 0,
          // position: 'absolute',
        },
        // tabBarBackground: () => (
        //   <LinearGradient
        //     colors={['#01010100', 'rgba(7, 2, 26, 0.6)', '#07021A']}
        //     className="absolute bottom-0 h-[280px] w-full"
        //   />
        // ),
      }}
      screenListeners={{
        tabPress: haptic,
      }}
    >
      {items.map((item, index) => (
        <Tabs.Screen
          key={index}
          name={item?.route}
          options={{
            title: item?.label,
            tabBarIcon: ({ focused }) =>
              focused ? item?.activeIcon : item?.inactiveIcon,
            tabBarTestID: `${item?.route}-tab`,
          }}
        />
      ))}
    </Tabs>
  );
}

// const WorkoutIcon = ({ focused }: { focused: boolean }) => {
//   const SIZE = 60;

//   return (
//     <View className="h-[40] w-[58px] items-center justify-center overflow-hidden rounded-full bg-primary-500">
//       <LottieView
//         autoPlay={focused}
//         source={require('@/assets/animations/run.json')}
//         style={{ width: SIZE, height: SIZE }}
//       />
//     </View>
//   );
// };
