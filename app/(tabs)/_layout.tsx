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

            // --- LOGIKA BARU UNTUK WARNA IKON ---
            // Cek apakah halaman saat ini adalah 'history' atau 'teams'
            const isSpecialPage =
              currentRouteName === "history" || currentRouteName === "teams";

            // Tentukan warna ikon: biru dongker untuk halaman spesial, putih untuk lainnya
            const iconColor = isSpecialPage ? Colors.primary : Colors.white;
            // --- AKHIR DARI LOGIKA BARU ---

            return (
              <View
                style={[styles.headerContainer, { paddingTop: insets.top }]}
              >
                {/* Bagian Kiri: Logo atau Tombol Kembali */}
                <View style={styles.leftContainer}>
                  {isHome ? (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("home")}
                    >
                      <View style={{ marginTop: 9 }}>
                        <LogoD width={37} height={37} />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.canGoBack()
                          ? navigation.goBack()
                          : navigation.navigate("home")
                      }
                    >
                      {/* Gunakan iconColor untuk tombol kembali */}
                      <Ionicons name="arrow-back" size={30} color={iconColor} />
                    </TouchableOpacity>
                  )}
                </View>

                {/* Bagian Tengah: Judul Halaman */}
                <View style={styles.centerContainer}>
                  {options.title && (
                    <Text
                      style={[styles.headerTitleText, { color: iconColor }]}
                    >
                      {options.title}
                    </Text>
                  )}
                </View>

                {/* Bagian Kanan: Notifikasi dan Akun */}
                <View style={styles.rightContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("notifications" as never)
                    }
                  >
                    {/* Gunakan iconColor untuk notifikasi */}
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
                    {/* Gunakan iconColor untuk profil */}
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
        <Tabs.Screen name="home" />
        <Tabs.Screen name="history" />
        <Tabs.Screen name="teams" />
        <Tabs.Screen name="settings" />
      </Tabs>
    </LampProvider>
  );
}

const styles = StyleSheet.create({
  // Styles tidak diubah sama sekali
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
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
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
  },
  headerTitleText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
});
