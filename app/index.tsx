import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Alert, View, StatusBar } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  if (Platform.OS === 'ios') return <WebViewScreenIos />;
  return <WebViewScreenAndroid />;
}
