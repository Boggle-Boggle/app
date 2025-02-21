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
    console.log('Dd');

    return () => {
      showListener.remove();
      hideListener.remove();
    };
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
