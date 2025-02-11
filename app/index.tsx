import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Alert } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const handleBackPress = () => {
    if (!webViewRef.current) return;

    if (canGoBack) {
      webViewRef.current.goBack();
      return true;
    } else {
      Alert.alert('알림', '앱을 종료하시겠습니까?', [
        { text: '취소', style: 'cancel' },
        { text: '종료', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <WebView
      ref={webViewRef}
      userAgent='Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36'
      source={{ uri: 'https://bbaegok.store' }}
      style={{ flex: 1 }}
      overScrollMode='never'
      onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
    />
  );
}
