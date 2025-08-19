// app/index.tsx
import React, { useEffect, useState } from 'react';
import { useRouter, Href } from 'expo-router';
import { useCachedResources } from '../hooks/useCachedResources';
import SplashScreenComponent from '../components/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppEntry() {
  const isLoadingComplete = useCachedResources();
  const router = useRouter();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    // --- MODIFIKASI SEMENTARA UNTUK DEVELOPMENT ---

    // 1. Logika pengecekan AsyncStorage kita buat menjadi komentar untuk sementara
    /* const checkOnboardingStatus = async () => {
      try {
        const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
        if (onboardingComplete === 'true') {
          setInitialRoute('/(tabs)/home');
        } else {
          setInitialRoute('/(auth)/onboarding');
        }
      } catch (e) {
        console.error("Failed to check onboarding status.", e);
        setInitialRoute('/(auth)/onboarding');
      }
    };

    checkOnboardingStatus();
    */

    // 2. Kita paksa rute awal untuk selalu ke halaman onboarding
    setInitialRoute('/(auth)/onboarding');

  }, []); // Dijalankan sekali saat aplikasi start

  useEffect(() => {
    if (isLoadingComplete && initialRoute) {
      router.replace(initialRoute as Href);
    }
  }, [isLoadingComplete, initialRoute, router]);

  return <SplashScreenComponent />;
}