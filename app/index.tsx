// app/index.tsx
import { Href, useRouter } from "expo-router";
import React, { useEffect, useState, } from "react";
import SplashScreenComponent from "../components/SplashScreen";
import { useCachedResources } from "../hooks/useCachedResources";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppEntry() {
  const isLoadingComplete = useCachedResources();
  const router = useRouter();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  // Tambahkan state baru untuk mengontrol kapan transisi dari splash screen
  const [splashScreenTimerCompleted, setSplashScreenTimerCompleted] =
    useState(false);

  useEffect(() => {
    // Menjalankan timer 5 detik untuk splash screen
    const timer = setTimeout(() => {
      setSplashScreenTimerCompleted(true);
    }, 4000);

    // Membersihkan timer jika komponen di-unmount
    return () => clearTimeout(timer);
  }, []); // Efek ini hanya berjalan sekali saat komponen dimuat

  useEffect(() => {
    // --- MODIFIKASI SEMENTARA UNTUK DEVELOPMENT ---
    
    const checkOnboardingStatus = async () => {
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
    

    setInitialRoute("/(auth)/onboarding");
  }, []);

  useEffect(() => {
    if (isLoadingComplete && initialRoute && splashScreenTimerCompleted) {
      router.replace(initialRoute as Href);
    }
  }, [isLoadingComplete, initialRoute, splashScreenTimerCompleted, router]);

  if (!isLoadingComplete || !splashScreenTimerCompleted) {
    return <SplashScreenComponent />;
  }

  return null;
}
