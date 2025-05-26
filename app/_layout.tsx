import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import * as Network from 'expo-network';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { WithLocalSvg } from 'react-native-svg/css';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isNetworkAvailable, setIsNetworkAvailable] = useState(true);

  // 네트워크 상태 체크
  useEffect(() => {
    const checkNetworkStatus = async () => {
      const { isConnected } = await Network.getNetworkStateAsync();
      setIsNetworkAvailable(isConnected ?? false);
    };

    checkNetworkStatus();

    // 네트워크 상태 변화 시 처리
    const intervalId = setInterval(checkNetworkStatus, 5000); // 5초마다 상태 체크

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isNetworkAvailable) {
      SplashScreen.hideAsync();
    }
  }, [isNetworkAvailable]);

  if (!isNetworkAvailable) {
    return (
      <View style={styles.errorPage}>
        <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
        <WithLocalSvg asset={require('../assets/network.svg')} style={styles.image} />
        <Text style={styles.title}>네트워크 연결 상태를 확인해주세요</Text>
        <Text style={styles.text}>빼곡을 사용하시려면 인터넷 연결이 필요해요.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            try {
              const state = await Network.getNetworkStateAsync();
              setIsNetworkAvailable(state.isConnected ?? false);
            } catch (error) {
              console.error('Error checking network status', error);
              setIsNetworkAvailable(false);
            }
          }}
        >
          <Text style={styles.btnText}>재시도하기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

const styles = StyleSheet.create({
  errorPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  image: {
    marginBottom: 30, // 텍스트와의 간격
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 10,
  },
  text: {
    opacity: 0.6,
    marginBottom: 100,
  },
  button: {
    width: '100%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6B9A6',
    borderRadius: 8,
    position: 'absolute', // 화면에 절대 위치
    bottom: 30, // 화면 하단에 배치
  },
  btnText: {
    color: 'white',
    fontSize: 17,
  },
});
