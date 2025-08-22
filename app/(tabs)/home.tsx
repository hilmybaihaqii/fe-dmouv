import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DeviceCard from "../../components/home/DeviceCard";
import { Colors } from "../../constants/Colors";

// Import SVG sebagai komponen React
import FanIcon from "../../assets/images/lampdua.svg"; // Pastikan Anda punya ikon ini
import LamphomeIcon from "../../assets/images/lamphome.svg";

const devices = [
  { id: "1", name: "LED", icon: <LamphomeIcon width={80} height={80} /> },
  { id: "2", name: "FAN", icon: <FanIcon width={80} height={80} /> },
];

const userName = "TimRisetCPS";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Hook untuk mendapatkan waktu dan tanggal saat ini
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      );
      setDate(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fungsi navigasi
  const handleDevicePress = (deviceId: string) => {
    if (deviceId === "1") {
      router.push("/lamp-control");
    } else if (deviceId === "2") {
      router.push("/fan-control");
    }
  };

  const handleViewMotion = () => {
    router.push("/(tabs)/history");
  };

  const HEADER_HEIGHT = 290;

  return (
    <SafeAreaView style={styles.container}>
      {/* Bagian Header Biru dengan Drop Shadow */}
      <View style={[styles.headerContainer, { paddingTop: insets.top + 10 }]}>
        {/* Kontainer untuk teks bagian atas */}
        <View>
          <Text style={styles.title}>Smart Motion Detection</Text>
          <Text style={styles.subtitle}>Sense Beyond Limits</Text>
          <Text style={styles.greeting}>
            Hi, <Text style={styles.userNameText}>{userName}! 👋</Text>
          </Text>
        </View>

        {/* Kontainer untuk Tombol dan Tagline */}
        <View style={styles.bottomHeaderContainer}>
          <Text style={styles.tagline}>#LightsUpWhenLifeMoves</Text>
          {/* Wrapper untuk menaikkan posisi tombol */}
          <View style={{ marginBottom: 5 }}>
            <TouchableOpacity
              style={styles.viewMotionButton}
              onPress={handleViewMotion}
            >
              <Text style={styles.viewMotionButtonText}>View Motion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Konten yang bisa di-scroll */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
      >
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>

        <View style={styles.devicesSection}>
          <Text style={styles.sectionTitle}>Devices</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.devicesList}
          >
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                name={device.name}
                icon={device.icon}
                onPress={() => handleDevicePress(device.id)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    backgroundColor: Colors.secondary,
    height: 330,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 25,
    paddingBottom: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: "space-between",
    // --- TAMBAHAN: Drop Shadow ---
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 26,
    color: Colors.white,
    marginTop: 60, // Mengurangi margin atas agar tidak terlalu jauh
    // --- Properti Shadow untuk Teks ---
    textShadowColor: "rgba(0, 0, 0, 0.25)", // Warna shadow hitam dengan opasitas 75%
    textShadowOffset: { width: 1, height: 2 }, // Posisi shadow sedikit ke kanan bawah
    textShadowRadius: 3, // Tingkat blur pada shadow
  },

  subtitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: Colors.primary,
    marginTop: 2,
  },
  greeting: {
    fontFamily: "Roboto-Regular",
    fontSize: 24,
    color: Colors.white,
    marginTop: 2,
  },
  userNameText: {
    fontFamily: "Roboto-Bold",
    color: Colors.white,
  },
  bottomHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", // Elemen rata bawah
  },
  tagline: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.white,
  },
  viewMotionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 20,
  },
  viewMotionButtonText: {
    color: Colors.white,
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.textLight,
  },
  timeText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: Colors.text,
  },
  devicesSection: {
    paddingLeft: 25,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: Colors.text,
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  devicesList: {
    paddingBottom: 120,
    paddingRight: 25,
    gap: 20,
  },
});
