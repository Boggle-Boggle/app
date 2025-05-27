import { Platform } from 'react-native';

import WebViewScreenIos from './(WebViewScreen)/ios';
import WebViewScreenAndroid from './(WebViewScreen)/android';

export default function App() {
  if (Platform.OS === 'ios') return <WebViewScreenIos />;
  return <WebViewScreenAndroid />;
}
