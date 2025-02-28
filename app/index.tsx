import * as Notifications from 'expo-notifications';
import React, { useEffect, useState, useRef } from 'react';
import { Keyboard, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  const webViewRef = useRef(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        console.log('푸시 알림 권한이 거부됨');
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log('푸시 토큰:', token);
  }

  useEffect(() => {
    registerForPushNotificationsAsync();

    // 1초마다 현재 시간을 확인
    const interval = setInterval(() => {
      const now = new Date();
      const isSunday = now.getDay() === 0;
      const hour = now.getHours();
      const minute = now.getMinutes();

      if (isSunday && hour === 18 && minute === 0)
        Notifications.scheduleNotificationAsync({
          content: {
            title: '한 주의 마무리는 빼곡과 함께!📚',
            body: `이번 주, 어떤 책을 읽었나요? 책장에 새로운 책을 추가해보세요✏️`,
          },
          trigger: null,
        });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const canSwipe = (url: string) => {
    const baseDomain = 'https://bbaegok.store';

    const noSwipePatterns = [
      baseDomain + '/$',
      baseDomain + '/search$',
      baseDomain + '/library$',
      baseDomain + '/myPage$',
    ];

    const allowSwipePatterns = [baseDomain + '/search\\?.*', baseDomain + '/myPage/.*'];

    if (allowSwipePatterns.some((pattern) => new RegExp(pattern).test(url))) return true;
    if (noSwipePatterns.some((pattern) => new RegExp(pattern).test(url))) return false;

    return true;
  };

  const isKeyboardAvoidingPage = () => {
    if (currentUrl.includes('nickname')) return 'height';

    return undefined;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={isKeyboardAvoidingPage()}>
      <TouchableWithoutFeedback onPressIn={dismissKeyboard}>
        <WebView
          ref={webViewRef}
          source={{ uri: 'https://bbaegok.store' }}
          style={[styles.webView]}
          bounces={false}
          scrollEnabled={!keyboardVisible}
          hideKeyboardAccessoryView={true}
          showsVerticalScrollIndicator={false}
          overScrollMode='never'
          contentInsetAdjustmentBehavior='never'
          keyboardDisplayRequiresUserAction={true}
          onNavigationStateChange={(event) => {
            setCurrentUrl(event.url);
          }}
          allowsBackForwardNavigationGestures={canSwipe(currentUrl)}
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'pink',
  },
  webView: {
    flex: 1,
  },
});
