import React from "react";
import SplashScreenComponent from "../components/SplashScreen";

/**
 * Ini adalah titik masuk aplikasi.
 * Tugasnya HANYA menampilkan komponen splash screen.
 * Semua logika routing, navigasi, dan pengecekan status
 * sekarang ditangani sepenuhnya oleh app/_layout.tsx.
 */
export default function AppEntry() {
  return <SplashScreenComponent />;
}
