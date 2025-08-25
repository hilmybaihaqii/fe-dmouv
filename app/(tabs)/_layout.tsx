import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CustomTabBar from "../../components/navigation/CustomTabBar";
import { Colors } from "../../constants/Colors";
import { LampProvider } from "../../context/LampContext";

import LogoD from "../../assets/images/D.svg";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <LampProvider>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: true,
          header: ({ options, navigation }) => {
            const state = navigation.getState();
            const currentRouteName = state.routes[state.index]?.name;
            const isHome = currentRouteName === "home";

            // Ikon akan putih di Home, dan biru di halaman lainnya
            const iconColor = isHome ? Colors.white : Colors.primary;

            return (
              <View
                style={[styles.headerContainer, { paddingTop: insets.top }]}
              >
                {/* --- PERUBAHAN 1: Logo dipindahkan ke sini --- */}
                <View style={styles.leftContainer}>
                  {isHome ? (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("home")}
                    >
                      <LogoD width={40} height={40} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.canGoBack()
                          ? navigation.goBack()
                          : navigation.navigate("home")
                      }
                    >
                      <Ionicons name="arrow-back" size={30} color={iconColor} />
                    </TouchableOpacity>
                  )}
                </View>

                {/* --- PERUBAHAN 2: Bagian tengah sekarang kosong di Home --- */}
                <View style={styles.centerContainer}>
                  {!isHome && options.title && (
                    <Text
                      style={[styles.headerTitleText, { color: iconColor }]}
                    >
                      {options.title}
                    </Text>
                  )}
                </View>

                {/* Bagian Kanan: Tidak ada perubahan */}
                <View style={styles.rightContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("notifications" as never)
                    }
                  >
                    <Ionicons
                      name="notifications-outline"
                      size={29}
                      color={iconColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 16 }}
                    onPress={() =>
                      navigation.navigate("account-settings" as never)
                    }
                  >
                    <Ionicons
                      name="person-circle-outline"
                      size={33}
                      color={iconColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
        }}
      >
        <Tabs.Screen name="home" options={{ title: "" }} />
        <Tabs.Screen name="history" options={{ title: "" }} />
        <Tabs.Screen name="teams" options={{ title: "" }} />
        <Tabs.Screen name="settings" options={{ title: "" }} />
      </Tabs>
    </LampProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    height: 110,
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
    transform: [{ translateY: 3 }],
  },
  centerContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    transform: [{ translateY: 1 }],
  },
  headerTitleText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
});
