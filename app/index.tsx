// app/index.tsx
import { Href, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import SplashScreenComponent from "../components/SplashScreen";
import { useCachedResources } from "../hooks/useCachedResources";

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
    // 1. Logika pengecekan AsyncStorage kita buat menjadi komentar untuk sementara
    /*
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
    */

    // 2. Kita paksa rute awal untuk selalu ke halaman onboarding
    setInitialRoute("/(auth)/onboarding");
  }, []); // Dijalankan sekali saat aplikasi start

  useEffect(() => {
    // Navigasi hanya jika:
    // 1. Semua sumber daya sudah dimuat (isLoadingComplete)
    // 2. Rute awal sudah ditentukan (initialRoute)
    // 3. Timer splash screen 5 detik sudah selesai (splashScreenTimerCompleted)
    if (isLoadingComplete && initialRoute && splashScreenTimerCompleted) {
      router.replace(initialRoute as Href);
    }
  }, [isLoadingComplete, initialRoute, splashScreenTimerCompleted, router]);

  // Tampilkan SplashScreenComponent selama sumber daya belum dimuat LENGKAP ATAU timer belum selesai
  if (!isLoadingComplete || !splashScreenTimerCompleted) {
    return <SplashScreenComponent />;
  }

  // Jika sudah dimuat dan timer selesai, biarkan Expo Router mengambil alih navigasi ke initialRoute
  return null;
}
