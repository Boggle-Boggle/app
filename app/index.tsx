import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <WebView
            // source={{ uri: 'http://localhost:5173' }}
            source={{ uri: 'https://bbaegok.store' }}
            style={styles.webView}
            sharedCookiesEnabled={true}
            hideKeyboardAccessoryView={true}
            showsVerticalScrollIndicator={false}
            overScrollMode='never' // 새로고침 방지
            bounces={false} // iOS에서 흔들림 방지
            scrollEnabled={false} // 스크롤 비활성화
            keyboardDisplayRequiresUserAction={false}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  webView: {
    flex: 1,
  },
});
