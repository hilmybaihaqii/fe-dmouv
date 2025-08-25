import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { SplashScreen, Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { FanProvider } from "../context/FanContext";
import { LampProvider } from "../context/LampContext";
import { useLoadFonts } from "../hooks/useLoadFonts";

SplashScreen.preventAutoHideAsync();

// --- HEADER COMPONENT (TIDAK ADA PERUBAHAN) ---
const Header = ({ options, navigation, route }: NativeStackHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { title } = options;

  const isAccountSettings = route.name === "account-settings";
  const isTransparentWithBlueIcons =
    route.name === "lamp-control" ||
    route.name === "fan-control" ||
    route.name === "notifications";

  let iconColor;
  let backgroundColor;
  let titleColor;

  if (isAccountSettings) {
    iconColor = Colors.white;
    titleColor = Colors.white;
    backgroundColor = "transparent";
  } else if (isTransparentWithBlueIcons) {
    iconColor = Colors.primary;
    titleColor = Colors.white;
    backgroundColor = "transparent";
  } else {
    iconColor = Colors.primary;
    titleColor = Colors.text;
    backgroundColor = Colors.background;
  }

  return (
    <View
      style={[
        headerStyles.headerContainer,
        {
          paddingTop: insets.top,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <View style={headerStyles.leftContainer}>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
      <View style={headerStyles.centerContainer}>
        {title && (
          <Text style={[headerStyles.headerTitleText, { color: titleColor }]}>
            {title}
          </Text>
        )}
      </View>
      <View style={headerStyles.rightContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("notifications" as never)}
        >
          <Ionicons name="notifications-outline" size={30} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => navigation.navigate("account-settings" as never)}
        >
          <Ionicons name="person-circle-outline" size={30} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- HEADER STYLES (TIDAK ADA PERUBAHAN) ---
const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  leftContainer: { flex: 1, alignItems: "flex-start" },
  centerContainer: { flex: 2, alignItems: "center", justifyContent: "center" },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerTitleText: { fontFamily: "Poppins-Bold", fontSize: 18 },
});

// --- ROOT LAYOUT COMPONENT (DENGAN PERUBAHAN ROUTING) ---
export default function RootLayout() {
  const [fontsLoaded, fontError] = useLoadFonts();
  const router = useRouter(); // Tambahkan router hook

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // --- PERUBAHAN DIMULAI DI SINI ---
      const checkInitialRoute = async () => {
        try {
          // 1. Cek status onboarding
          const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
          if (!hasOnboarded) {
            router.replace("/onboarding");
            return;
          }

          // 2. Cek status login (token)
          const userToken = await AsyncStorage.getItem("userToken");
          if (!userToken) {
            router.replace("/ip-device");
            return;
          }

          // 3. Jika semua sudah, arahkan ke home
          router.replace("/(tabs)/home");
        } catch (e) {
          console.warn("Gagal memeriksa rute awal:", e);
          router.replace("/(auth)/login"); // Fallback
        } finally {
          SplashScreen.hideAsync();
        }
      };

      checkInitialRoute();
      // --- PERUBAHAN BERAKHIR DI SINI ---
    }
  }, [fontsLoaded, fontError, router]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // --- STRUKTUR JSX (TIDAK ADA PERUBAHAN) ---
  return (
    <FanProvider>
      <LampProvider>
        <StatusBar barStyle="light-content" />
        <Stack
          screenOptions={{
            header: ({ options, navigation, route }) => (
              <Header options={options} navigation={navigation} route={route} />
            ),
            headerShown: true,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
              animation: "fade",
              animationDuration: 4000,
            }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="account-settings" options={{ title: "" }} />
          <Stack.Screen name="lamp-control" options={{ title: "" }} />
          <Stack.Screen name="fan-control" options={{ title: "" }} />
          <Stack.Screen name="notifications" options={{ title: "" }} />
        </Stack>
      </LampProvider>
    </FanProvider>
  );
}
