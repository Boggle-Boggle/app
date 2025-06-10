import { Platform } from 'react-native';
import WebViewScreenAndroid from './(WebViewScreen)/android';
import WebViewScreenIos from './(WebViewScreen)/ios';

export default function App() {
  if (Platform.OS === 'ios') return <WebViewScreenIos />;
  return <WebViewScreenAndroid />;
}
