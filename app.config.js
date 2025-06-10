module.exports = ({ config }) => {
  return {
    expo: {
      name: '빼곡',
      slug: 'app',
      version: '1.0.2',
      orientation: 'portrait',
      icon: './assets/images/logoForIOS.png',
      scheme: 'bbaegok',
      userInterfaceStyle: 'automatic',
      newArchEnabled: true,
      splash: {
        image: './assets/images/logo.png',
        resizeMode: 'cover',
        backgroundColor: '#EEEDEB',
      },
      ios: {
        icon: {
          dark: './assets/images/logoForIOS.png',
          light: './assets/images/logoForIOS.png',
          tinted: './assets/images/logoForIOS.png',
        },
        supportsTablet: false,
        bundleIdentifier: 'com.bbaegok.app',
        buildNumber: '1.0.1',
        infoPlist: {
          ITSAppUsesNonExemptEncryption: false,
          NSPushNotificationsUsageDescription: '매주 읽은 책을 기록할 수 있도록 알림을 보내드립니다.',
          LSApplicationQueriesSchemes: ['kakaotalk', 'kakaolink', 'naversearchapp', 'instagram'],
        },
      },
      android: {
        package: 'bbaegok.app',
        intentFilters: [
          {
            action: 'VIEW',
            data: [
              {
                scheme: 'kakaotalk',
              },
            ],
            category: ['BROWSABLE', 'DEFAULT'],
          },
        ],
      },
      plugins: ['expo-router'],
      experiments: {
        typedRoutes: true,
      },
      extra: {
        router: {
          origin: false,
        },
        eas: {
          projectId: '66be81d8-1ef2-4252-9be3-d9e376592645',
        },
        webviewUrl: process.env.EXPO_PUBLIC_WEBVIEW_URL,
      },
    },
  };
};
