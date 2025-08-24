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
import { fetchDeviceStatus, updateLampState } from "../api/api";
import LampIcon from "../assets/images/lamphome.svg";
import CustomSwitch from "../components/CustomSwitch";
import { Colors } from "../constants/Colors";
import { useLamp } from "../context/LampContext";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Status Types ---
type PersonStatus = "detected" | "not-detected";
type LightStatus = "on" | "off";

// --- Status Item Component ---
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
export default function LampControlScreen() {
  const { isAutoMode, setIsAutoMode } = useLamp();
  const [lampStatus, setLampStatus] = useState<LightStatus>("off");
  const [personStatus, setPersonStatus] =
    useState<PersonStatus>("not-detected");
  const [isLoading, setIsLoading] = useState(true);

  // --- Effect for Initial Fetch & Interval ---
  useEffect(() => {
    const getInitialStatus = async () => {
      try {
        const data = await fetchDeviceStatus();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setLampStatus(data.lampStatus);
        setPersonStatus(data.personStatus);
        setIsAutoMode(data.isAutoMode);
      } catch (error) {
        console.error("Fetch initial status error:", error);
        Alert.alert("Error", "Failed to fetch initial status from the server.");
      } finally {
        setIsLoading(false);
      }
    };

    getInitialStatus();

    const intervalId = setInterval(async () => {
      try {
        const data = await fetchDeviceStatus();
        if (data.personStatus !== personStatus) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setPersonStatus(data.personStatus);
        }
      } catch (error) {
        console.error("Fetch status update error:", error);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [setIsAutoMode, personStatus]);

  // --- Effect for Automatic Mode Logic ---
  useEffect(() => {
    if (isLoading) return;

    const performAutoUpdate = (newStatus: LightStatus) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setLampStatus(newStatus);
      updateLampState({ lampStatus: newStatus }).catch((err) =>
        console.error("Auto mode update failed:", err)
      );
    };

    if (isAutoMode) {
      if (personStatus === "detected" && lampStatus === "off") {
        performAutoUpdate("on");
      } else if (personStatus === "not-detected" && lampStatus === "on") {
        performAutoUpdate("off");
      }
    }
  }, [personStatus, isAutoMode, isLoading, lampStatus]);

  // --- Button Handlers ---
  const handleAutoModeToggle = async () => {
    const newMode = !isAutoMode;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setIsAutoMode(newMode);
    try {
      await updateLampState({ isAutoMode: newMode });
    } catch (error) {
      console.error("Update auto mode failed:", error);
      Alert.alert("Error", "Failed to update automatic mode.");
      setIsAutoMode(!newMode); // Rollback state on failure
    }
  };

  const handleLampToggle = async () => {
    if (isAutoMode) return;
    const newStatus = lampStatus === "on" ? "off" : "on";
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLampStatus(newStatus);
    try {
      await updateLampState({ lampStatus: newStatus });
    } catch (error) {
      console.error("Update lamp status failed:", error);
      Alert.alert("Error", "Failed to update lamp status.");
      setLampStatus(lampStatus); // Rollback state on failure
    }
  };

  const isLampOn = lampStatus === "on";

  // --- Loading View ---
  if (isLoading) {
    return (
      // --- PERUBAHAN: Mengganti LinearGradient menjadi View ---
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.white} />
        <Text style={styles.loadingText}>Loading Status...</Text>
      </View>
    );
  }

  // --- Main View ---
  return (
    // --- PERUBAHAN: Mengganti LinearGradient menjadi View ---
    <View style={styles.fullScreenContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={styles.safeArea}>
        {/* Top Section for Lamp */}
        <View style={styles.topContainer}>
          <Text style={styles.headerTitle}>Smart Lamp</Text>
          <Text style={styles.headerSubtitle}>Control your smart lighting</Text>
          <View style={styles.lampImageContainer}>
            {/* --- PERUBAHAN: Mengganti <Image> dengan komponen SVG --- */}
            <LampIcon
              width="100%"
              height="100%"
              fill={isLampOn ? Colors.lampOnColor : Colors.lampOffColor}
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
            onPress={handleLampToggle}
            disabled={isAutoMode}
            activeOpacity={0.7}
          >
            <Ionicons
              name="power"
              size={36}
              color={isLampOn && !isAutoMode ? Colors.primary : Colors.white}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.lampStatus,
              { color: isLampOn ? Colors.greenDot : Colors.textLight },
            ]}
          >
            Lamp is {isLampOn ? "On" : "Off"}
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
              icon="bulb-outline"
              label="Lamp Status"
              value={isLampOn ? "On" : "Off"}
              color={isLampOn ? Colors.greenDot : Colors.redDot}
            />
          </View>

          {/* Automatic Mode Control */}
          <View style={styles.autoModeContainer}>
            <View>
              <Text style={styles.autoModeTitle}>Automatic Mode</Text>
              <Text style={styles.autoModeSubtitle}>
                Control lamp based on detection
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

// --- Stylesheet ---
const styles = StyleSheet.create({
  // --- PERUBAHAN: Menambahkan backgroundColor untuk warna solid ---
  fullScreenContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  safeArea: {
    flex: 1,
    // --- PERUBAHAN: Menghapus justifyContent agar layout mengalir dari atas ke bawah ---
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary, // Menyamakan warna background
  },
  loadingText: {
    marginTop: 10,
    color: Colors.white,
    fontSize: 16,
  },

  // Top (Blue) Section
  topContainer: {
    flex: 1, // --- PERUBAHAN: Ini akan mengisi semua ruang kosong di atas card ---
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
  lampImageContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 15,
  },

  // Bottom (White) Control Card
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
    // --- PERUBAHAN: Card tidak lagi memiliki posisi fleksibel, ia akan duduk di bawah topContainer ---
  },
  dragger: {
    width: 50,
    height: 5,
    backgroundColor: Colors.border,
    borderRadius: 3,
    marginBottom: 25,
  },

  // Power Button
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
  lampStatus: {
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

  // Status Container
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

  // Automatic Mode
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
