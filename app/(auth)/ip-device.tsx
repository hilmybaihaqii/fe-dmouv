import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";

export default function IpDeviceScreen() {
  const [ipAddress, setIpAddress] = useState("");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // State untuk melacak input mana yang sedang fokus (active)
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const router = useRouter();

  const handleConnect = () => {
    if (!ipAddress || !ssid || !password) {
      alert("Please fill in all fields.");
      return;
    }
    console.log("Connecting with:", { ipAddress, ssid, password });
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/images/fulldmouv.svg")}
            style={styles.logo}
          />
          <Text style={styles.title}>Enter your IP Device and SSID</Text>
          <Text style={styles.subtitle}>
            Please provide your device&apos;s IP and Wifi SSID to keep you
            connected
          </Text>
        </View>

        <View style={styles.card}>
          {/* Input IP Device */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>IP Device</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    focusedInput === "ip" ? Colors.primary : Colors.border,
                },
              ]}
              placeholder="Enter Your IP Device"
              placeholderTextColor={Colors.textLight}
              value={ipAddress}
              onChangeText={setIpAddress}
              keyboardType="decimal-pad"
              autoCapitalize="none"
              onFocus={() => setFocusedInput("ip")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Input SSID */}
          <View style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>SSID</Text>
              <Text style={styles.labelHint}>WI-FI ID</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    focusedInput === "ssid" ? Colors.primary : Colors.border,
                },
              ]}
              placeholder="SSID Name"
              placeholderTextColor={Colors.textLight}
              value={ssid}
              onChangeText={setSsid}
              autoCapitalize="none"
              onFocus={() => setFocusedInput("ssid")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Input Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.passwordWrapper,
                {
                  borderColor:
                    focusedInput === "password"
                      ? Colors.primary
                      : Colors.border,
                },
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor={Colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIconWrapper}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tombol Connect */}
          <TouchableOpacity
            style={styles.connectButton}
            onPress={handleConnect}
          >
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: Colors.primary,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: Colors.textLight,
    textAlign: "center",
    marginTop: 8,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: Colors.primary,
  },
  labelHint: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: Colors.textLight,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: Colors.text,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: Colors.text,
  },
  eyeIconWrapper: {
    paddingHorizontal: 10,
  },
  connectButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  connectButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: Colors.white,
  },
});
