import { Ionicons } from "@expo/vector-icons";
import { default as Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  // State baru untuk melacak input mana yang sedang fokus (active)
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    checkbox: "",
  });
  const validateFields = () => {
    const newErrors = { email: "", password: "", checkbox: "" };
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Fill this field";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Fill this field";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!isChecked) {
      newErrors.checkbox = "You must agree to the terms to continue.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleLogin = async () => {
    // --- PERUBAHAN: Mengganti semua 'alert' dengan satu fungsi validasi ---
    if (!validateFields()) {
      return; // Hentikan jika validasi gagal
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Logging in with:", { email, password });
    setIsLoading(false);
    router.push("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.headerContainer}>
          <FullLogo width={306} height={66} style={styles.logo} />
          <Text style={styles.title}>Welcome to D&apos;mouv</Text>
          <Text style={styles.subtitle}>
            {"Your smart way to sense, react,\nand save energy"}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              // --- PERUBAHAN: Style dinamis berdasarkan error dan focus ---
              style={[
                styles.input,
                focusedInput === "email" && styles.inputFocused,
                !!errors.email && styles.inputError,
              ]}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.textLight}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
            {/* --- BAGIAN BARU: Menampilkan teks error --- */}
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

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
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor={Colors.textLight}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color={Colors.primary}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {/* --- BAGIAN BARU: Menampilkan teks error --- */}
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? Colors.primary : undefined}
            />
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/privacy-policy")}
              >
                <Text style={styles.checkboxLabel}>
                  I agree to the{" "}
                  <Text style={styles.linkText}>Terms & Conditions</Text>
                  {" and "}
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* --- BAGIAN BARU: Menampilkan teks error untuk checkbox --- */}
          {errors.checkbox ? (
            <Text style={[styles.errorText, { marginBottom: 15 }]}>
              {errors.checkbox}
            </Text>
          ) : null}

          <TouchableOpacity
            style={[styles.connectButton, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.connectButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotPasswordLink}
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Don&apos;t have any account?
              <Text
                style={styles.signUpText}
                onPress={() => router.push("/(auth)/register")}
              >
                {" "}
                Sign Up
              </Text>
            </Text>
          </View>
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
  label: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 8,
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
  eyeIcon: {
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxLabel: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: Colors.textLight,
    lineHeight: 18,
  },
  linkText: {
    color: Colors.primary,
    fontFamily: "Roboto-Medium",
  },
  connectButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: Colors.primary,
  },
  connectButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: Colors.white,
  },
  forgotPasswordLink: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: Colors.primary,
  },
  footerContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  footerText: {
    fontSize: 15,
    fontFamily: "Roboto-Regular",
    color: Colors.textLight,
  },
  signUpText: {
    fontSize: 15,
    fontFamily: "Roboto-Medium",
    color: Colors.primary,
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  inputError: {
    borderColor: Colors.redDot,
  },
  errorText: {
    color: Colors.redDot,
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 4,
  },
});
