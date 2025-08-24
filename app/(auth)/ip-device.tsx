import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FullLogo from "../../assets/images/fulldmouv.svg";
import { Colors } from "../../constants/Colors";

export default function IpDeviceScreen() {
  const [ipAddress, setIpAddress] = useState("");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // State untuk melacak input mana yang sedang fokus (active)
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const router = useRouter();
  const [errors, setErrors] = useState({
    ipAddress: "",
    ssid: "",
    password: "",
  });
  const validateFields = () => {
    const newErrors = { ipAddress: "", ssid: "", password: "" };
    let isValid = true;

    if (!ipAddress) {
      newErrors.ipAddress = "Fill this field";
      isValid = false;
    }
    if (!ssid) {
      newErrors.ssid = "Fill this field";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Fill this field";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleConnect = () => {
    // --- PERUBAHAN: Mengganti logika alert dengan fungsi validasi baru ---
    if (!validateFields()) {
      return; // Hentikan proses jika validasi gagal
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
          <FullLogo width={306} height={66} style={styles.logo} />
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
                focusedInput === "ip" && styles.inputFocused,
                !!errors.ipAddress && styles.inputError,
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
            {/* --- BAGIAN BARU: Menampilkan teks error --- */}
            {errors.ipAddress ? (
              <Text style={styles.errorText}>{errors.ipAddress}</Text>
            ) : null}
          </View>

          {/* Input SSID */}
          <View style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>SSID</Text>
              <Text style={styles.labelHint}>WI-FI ID</Text>
            </View>
            <TextInput
              // --- PERUBAHAN: Style dinamis berdasarkan error dan focus ---
              style={[
                styles.input,
                focusedInput === "ssid" && styles.inputFocused,
                !!errors.ssid && styles.inputError,
              ]}
              placeholder="SSID Name"
              placeholderTextColor={Colors.textLight}
              value={ssid}
              onChangeText={setSsid}
              autoCapitalize="none"
              onFocus={() => setFocusedInput("ssid")}
              onBlur={() => setFocusedInput(null)}
            />
            {/* --- BAGIAN BARU: Menampilkan teks error --- */}
            {errors.ssid ? (
              <Text style={styles.errorText}>{errors.ssid}</Text>
            ) : null}
          </View>

          {/* Input Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View
              // --- PERUBAHAN: Style dinamis berdasarkan error dan focus ---
              style={[
                styles.passwordWrapper,
                focusedInput === "password" && styles.inputFocused,
                !!errors.password && styles.inputError,
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
            {/* --- BAGIAN BARU: Menampilkan teks error --- */}
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
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
    backgroundColor: Colors.white,
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
    fontFamily: "Poppins-Medium",
    fontSize: 22,
    color: Colors.primary,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontFamily: "Poppins-ExtraLight",
    fontSize: 16,
    color: Colors.primary,
    textAlign: "center",
    marginTop: 8,
  },
  card: {
    backgroundColor: Colors.cardgray,
    borderRadius: 20,
    padding: 25,
    // --- PERUBAHAN DI SINI ---
    elevation: 7, // Naikkan untuk Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 }, // Bisa sedikit ditambah offset-nya
    shadowOpacity: 0.25, // Naikkan agar lebih gelap
    shadowRadius: 3.84, // Kurangi agar lebih tajam
    // --- AKHIR PERUBAHAN ---
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
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
  // --- BAGIAN BARU: Styles untuk error dan focus ---
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 1.5, // Sedikit lebih tebal saat fokus
  },
  inputError: {
    borderColor: Colors.redDot, // Warna border merah saat error
  },
  errorText: {
    color: Colors.redDot,
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 4,
  },
});
