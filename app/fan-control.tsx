import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
// --- PERUBAHAN: Menggunakan API & Context untuk Kipas Angin ---
import { fetchFanStatus, updateFanState } from "../api/api";
import FanIcon from "../assets/images/lampdua.svg"; // Ganti dengan ikon kipas Anda
import CustomSwitch from "../components/CustomSwitch";
import { Colors } from "../constants/Colors";
import { useFan } from "../context/FanContext"; // Menggunakan Fan Context

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Status Types ---
type PersonStatus = "detected" | "not-detected";
type FanStatus = "on" | "off"; // Diubah dari LightStatus

// --- Status Item Component (Tidak ada perubahan) ---
const StatusItem: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  color: string;
}> = ({ icon, label, value, color }) => (
  <View style={styles.statusItem}>
    <Ionicons name={icon} size={24} color={Colors.primary} />
    <View style={styles.statusTextContainer}>
      <Text style={styles.statusLabel}>{label}</Text>
      <Text style={[styles.statusValue, { color }]}>{value}</Text>
    </View>
  </View>
);

// --- Main Component ---
export default function FanControlScreen() {
  // --- PERUBAHAN: Menggunakan state dan context untuk Kipas Angin ---
  const { isAutoMode, setIsAutoMode } = useFan();
  const [fanStatus, setFanStatus] = useState<FanStatus>("off");
  const [personStatus, setPersonStatus] =
    useState<PersonStatus>("not-detected");
  const [isLoading, setIsLoading] = useState(true);

  // --- Effect for Initial Fetch & Interval ---
  useEffect(() => {
    const getInitialStatus = async () => {
      try {
        const data = await fetchFanStatus(); // API Kipas Angin
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFanStatus(data.fanStatus);
        setPersonStatus(data.personStatus);
        setIsAutoMode(data.isAutoMode);
      } catch (error) {
        console.error("Fetch initial fan status error:", error);
        Alert.alert("Error", "Failed to fetch initial status from the server.");
      } finally {
        setIsLoading(false);
      }
    };

    getInitialStatus();

    const intervalId = setInterval(async () => {
      try {
        const data = await fetchFanStatus(); // API Kipas Angin
        if (data.personStatus !== personStatus) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setPersonStatus(data.personStatus);
        }
      } catch (error) {
        console.error("Fetch fan status update error:", error);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [setIsAutoMode, personStatus]);

  // --- Effect for Automatic Mode Logic ---
  useEffect(() => {
    if (isLoading) return;

    const performAutoUpdate = (newStatus: FanStatus) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setFanStatus(newStatus);
      updateFanState({ fanStatus: newStatus }).catch(
        (
          err // API Kipas Angin
        ) => console.error("Auto mode update failed:", err)
      );
    };

    if (isAutoMode) {
      if (personStatus === "detected" && fanStatus === "off") {
        performAutoUpdate("on");
      } else if (personStatus === "not-detected" && fanStatus === "on") {
        performAutoUpdate("off");
      }
    }
  }, [personStatus, isAutoMode, isLoading, fanStatus]);

  // --- Button Handlers ---
  const handleAutoModeToggle = async () => {
    const newMode = !isAutoMode;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setIsAutoMode(newMode);
    try {
      await updateFanState({ isAutoMode: newMode }); // API Kipas Angin
    } catch (error) {
      console.error("Update auto mode failed:", error);
      Alert.alert("Error", "Failed to update automatic mode.");
      setIsAutoMode(!newMode);
    }
  };

  const handleFanToggle = async () => {
    if (isAutoMode) return;
    const newStatus = fanStatus === "on" ? "off" : "on";
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFanStatus(newStatus);
    try {
      await updateFanState({ fanStatus: newStatus }); // API Kipas Angin
    } catch (error) {
      console.error("Update fan status failed:", error);
      Alert.alert("Error", "Failed to update fan status.");
      setFanStatus(fanStatus);
    }
  };

  const isFanOn = fanStatus === "on";

  // --- Loading View ---
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.white} />
        <Text style={styles.loadingText}>Loading Status...</Text>
      </View>
    );
  }

  // --- Main View ---
  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={styles.safeArea}>
        {/* Top Section for Fan */}
        <View style={styles.topContainer}>
          {/* --- PERUBAHAN: Teks diubah --- */}
          <Text style={styles.headerTitle}>Smart Fan</Text>
          <Text style={styles.headerSubtitle}>Control your smart cooling</Text>
          <View style={styles.deviceImageContainer}>
            {/* --- PERUBAHAN: Ikon diubah --- */}
            <FanIcon
              width="100%"
              height="100%"
              fill={isFanOn ? Colors.lampOnColor : Colors.lampOffColor}
            />
          </View>
        </View>

        {/* Control Card */}
        <View style={styles.controlCard}>
          <View style={styles.dragger} />

          {/* Power Button */}
          <TouchableOpacity
            style={[
              styles.powerButton,
              isAutoMode && { backgroundColor: Colors.border },
            ]}
            onPress={handleFanToggle}
            disabled={isAutoMode}
            activeOpacity={0.7}
          >
            <Ionicons
              name="power"
              size={36}
              color={isFanOn && !isAutoMode ? Colors.primary : Colors.white}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.deviceStatus,
              { color: isFanOn ? Colors.greenDot : Colors.textLight },
            ]}
          >
            {/* --- PERUBAHAN: Teks diubah --- */}
            Fan is {isFanOn ? "On" : "Off"}
          </Text>

          <View style={styles.divider} />

          {/* Status Container */}
          <View style={styles.statusContainer}>
            <StatusItem
              icon="body-outline"
              label="Person Status"
              value={personStatus === "detected" ? "Detected" : "Not Detected"}
              color={
                personStatus === "detected" ? Colors.redDot : Colors.greenDot
              }
            />
            <View style={styles.statusSeparator} />
            <StatusItem
              // --- PERUBAHAN: Ikon dan teks diubah ---
              icon="sync-circle-outline"
              label="Fan Status"
              value={isFanOn ? "On" : "Off"}
              color={isFanOn ? Colors.greenDot : Colors.redDot}
            />
          </View>

          {/* Automatic Mode Control */}
          <View style={styles.autoModeContainer}>
            <View>
              <Text style={styles.autoModeTitle}>Automatic Mode</Text>
              <Text style={styles.autoModeSubtitle}>
                {/* --- PERUBAHAN: Teks diubah --- */}
                Control fan based on detection
              </Text>
            </View>
            <CustomSwitch
              value={isAutoMode}
              onValueChange={handleAutoModeToggle}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

// --- Stylesheet (menggunakan nama generik seperti deviceImage agar bisa dipakai ulang) ---
const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  safeArea: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  loadingText: {
    marginTop: 10,
    color: Colors.white,
    fontSize: 16,
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: 20,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: Colors.textLight,
    marginTop: 2,
  },
  deviceImageContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 15,
  },
  controlCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  dragger: {
    width: 50,
    height: 5,
    backgroundColor: Colors.border,
    borderRadius: 3,
    marginBottom: 25,
  },
  powerButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  deviceStatus: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 25,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 20,
  },
  statusContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "#F4F3F3",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  statusItem: {
    flex: 1,
    alignItems: "center",
  },
  statusTextContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  statusLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.textLight,
  },
  statusValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 4,
  },
  statusSeparator: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 10,
  },
  autoModeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F4F3F3",
    borderRadius: 15,
    padding: 20,
    width: "100%",
  },
  autoModeTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
  autoModeSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 2,
  },
});
