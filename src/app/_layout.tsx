/* eslint-disable max-lines-per-function */
/* eslint-disable react/react-in-jsx-scope */
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack, useNavigationContainerRef } from 'expo-router';
import { StatusBar, StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { APIProvider } from '@/api';
import { hydrateAuth, loadSelectedTheme } from '@/core';
import { useThemeConfig } from '@/core/use-theme-config';

export { ErrorBoundary } from 'expo-router';

// Import  global CSS file
import '../../global.css';

import { ThirdwebProvider } from 'thirdweb/react';

export const unstable_settings = {
  initialRouteName: '(app)',
};

hydrateAuth();
loadSelectedTheme();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(app)"
          options={{ gestureEnabled: false, headerShown: false }}
        />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen
          name="auth/login-completed"
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="auth/permissions"
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="hub/create-run-with-me/index"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="hub/create-challenge/index"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="hub/create-challenge/set-goal"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="hub/create-challenge/personalize"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="hub/create-challenge/success"
          options={{ presentation: 'fullScreenModal' }}
        />
        <Stack.Screen
          name="hub/create-challenge/invite-friends"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="hub/create-run-with-me/select-club"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="hub/create-run-with-me/success"
          options={{ presentation: 'fullScreenModal' }}
        />
        <Stack.Screen
          name="hub/create-run-with-me/invite-friends"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="workout/sim/leaderboard"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="workout/sim/workout-finished"
          options={{ presentation: 'fullScreenModal' }}
        />
        <Stack.Screen
          name="workout/setup-run/invite-friends"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="hub/run-details/participants"
          options={{ presentation: 'modal' }}
        />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView
      style={styles.container}
      className={theme.dark ? `dark` : undefined}
    >
      <StatusBar barStyle="light-content" />
      <ThemeProvider value={theme}>
        <ThirdwebProvider>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </APIProvider>
        </ThirdwebProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
