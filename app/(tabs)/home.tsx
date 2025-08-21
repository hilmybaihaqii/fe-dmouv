// app/(tabs)/home.tsx

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
import DeviceCard from "../../components/home/DeviceCard";
import { Colors } from "../../constants/Colors";

const devices = [
  { id: "1", name: "LED", icon: require("../../assets/images/lamphome.svg") },
];

const userName = "TimRisetCPS";

export default function HomeScreen() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedDate = now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setTime(formattedTime);
      setDate(formattedDate);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDevicePress = (deviceId: string) => {
    router.push(`/lamp-control?id=${deviceId}`);
  };

  const handleViewMotion = () => {
    router.push("/(tabs)/history");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Konten Home */}
        <View style={styles.welcomeCard}>
          <View>
            <Text style={styles.welcomeTitle}>Smart Motion Detection</Text>
            <Text style={styles.welcomeSubtitle}>Sense Beyond Limits</Text>
          </View>
          <Text style={styles.welcomeUser}>
            Hi, <Text style={styles.welcomeUserName}>{userName}! 👋</Text>
          </Text>

          <View style={styles.welcomeFooter}>
            <TouchableOpacity
              style={styles.viewMotionButton}
              onPress={handleViewMotion}
            >
              <Text style={styles.viewMotionButtonText}>View Motion</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.welcomeTagline}>#LightsUpWhenLifeMoves</Text>
        </View>

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

  // Welcome Card Styles
  welcomeCard: {
    backgroundColor: Colors.secondary,
    borderRadius: 30,
    padding: 25,
    marginHorizontal: 20,
    marginTop: 20,
  },
  welcomeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  welcomeTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    color: Colors.white,
  },
  welcomeSubtitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    color: Colors.primary,
    marginTop: 5,
  },
  welcomeUser: {
    fontFamily: "Roboto-Reguler",
    fontSize: 25,
    color: Colors.primary,
    marginTop: 5,
  },
  welcomeUserName: {
    fontFamily: "Roboto-Reguler",
    fontSize: 25,
  },
  welcomeFooter: {
    alignItems: "flex-end",
    marginTop: 25,
  },
  welcomeTagline: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.white,
    marginTop: 15,
  },
  viewMotionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
  },
  viewMotionButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: Colors.white,
  },

  // Date and Time Styles
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.text,
  },
  timeText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.text,
  },

  // Devices Section Styles
  devicesSection: {
    paddingLeft: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: Colors.text,
    marginBottom: 15,
  },
  devicesList: {
    paddingBottom: 120,
    paddingRight: 5,
    gap: 20,
  },
});
