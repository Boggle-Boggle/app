import React, { useEffect } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import * as Network from 'expo-network';
import 'react-native-reanimated';
import WebViewFallback from '@/components/WebViewFallback';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isConnected } = Network.useNetworkState();

  useEffect(() => {
    if (isConnected) {
      SplashScreen.hideAsync();
    }
  }, [isConnected]);

  if (!isConnected) return <WebViewFallback />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
