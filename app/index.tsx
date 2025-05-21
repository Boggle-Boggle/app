import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Alert, View, StatusBar, Linking } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string>('#FFFFFF');
  const getStatusColor = () => {
    if (currentUrl.includes('login')) return '#CBBAB9';
    if (currentUrl.includes('note')) return '#DCD7D6';
    if (
      currentUrl.includes('signup') ||
      currentUrl.includes('signUp') ||
      currentUrl.includes('nickname') ||
      currentUrl.includes('terms') ||
      currentUrl.includes('VersionInfo') ||
      currentUrl.includes('deleteAccount') ||
      currentUrl.includes('edit')
    )
      return '#FFFFFF';

    return '#EEEDEB';
  };

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

  const shouldOpenExternally = (url: string): boolean => {
    return !url.startsWith('http') && !url.startsWith('https');
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={getStatusColor()} barStyle='dark-content' />
      <WebView
        ref={webViewRef}
        userAgent='Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36'
        source={{ uri: 'https://bbaegok.store' }}
        style={{ flex: 1 }}
        overScrollMode='never'
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
          setCurrentUrl(navState.url);
        }}
        originWhitelist={['http', 'https', 'kakaotalk']}
        onShouldStartLoadWithRequest={(event) => {
          const url = event.url;

          if (shouldOpenExternally(url)) {
            Linking.openURL(url).catch((err) => {
              console.warn('외부 URL 열기 실패:', err);
            });

            return false;
          }

          return true;
        }}
      />
    </View>
  );
}
