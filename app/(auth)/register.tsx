import { Ionicons } from "@expo/vector-icons";
import { default as Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FullLogo from "../../assets/images/fulldmouv.svg";
import { Colors } from "../../constants/Colors";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkbox: "",
  });

  // --- PERUBAHAN: State 'successMessage' DIHAPUS ---

  const validateFields = () => {
    // ... (Fungsi validasi tetap sama)
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      checkbox: "",
    };
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      newErrors.name = "Fill this field";
      isValid = false;
    }
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
    if (!confirmPassword) {
      newErrors.confirmPassword = "Fill this field";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    if (!isChecked) {
      newErrors.checkbox = "You must agree to the terms to continue.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateFields()) {
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Registering with:", { name, email, password });
    setIsLoading(false);

    // --- PERUBAHAN: Langsung navigasi ke halaman login ---
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- PERUBAHAN: Notifikasi banner DIHAPUS dari sini --- */}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <FullLogo width={306} height={66} style={styles.logo} />
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>
              Let’s get you started with D’mouv
            </Text>
          </View>

          <View style={styles.card}>
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === "name" && styles.inputFocused,
                    !!errors.name && styles.inputError,
                  ]}
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={Colors.textLight}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                />
                {errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
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
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={[
                    styles.passwordWrapper,
                    focusedInput === "password" && styles.inputFocused,
                    !!errors.password && styles.inputError,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                    placeholderTextColor={Colors.textLight}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    textContentType="newPassword"
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
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View
                  style={[
                    styles.passwordWrapper,
                    focusedInput === "confirmPassword" && styles.inputFocused,
                    !!errors.confirmPassword && styles.inputError,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!isConfirmPasswordVisible}
                    placeholderTextColor={Colors.textLight}
                    onFocus={() => setFocusedInput("confirmPassword")}
                    onBlur={() => setFocusedInput(null)}
                    textContentType="newPassword"
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                  >
                    <Ionicons
                      name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                      size={24}
                      color={Colors.primary}
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword ? (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
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
              {errors.checkbox ? (
                <Text style={[styles.errorText, { marginBottom: 15 }]}>
                  {errors.checkbox}
                </Text>
              ) : null}

              <TouchableOpacity
                style={[
                  styles.connectButton,
                  isLoading && styles.buttonDisabled,
                ]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <Text style={styles.connectButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                  Already have an account?
                  <Text
                    style={styles.signInText}
                    onPress={() => router.push("/(auth)/login")}
                  >
                    {" "}
                    Sign In
                  </Text>
                </Text>
              </View>
            </>
          </View>
        </ScrollView>
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
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: "contain",
    marginBottom: 5,
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
    marginTop: 5,
  },
  card: {
    backgroundColor: Colors.cardgray,
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputContainer: {
    marginBottom: 15,
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
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: Colors.primary,
  },
  connectButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: Colors.white,
  },
  footerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 15,
    fontFamily: "Roboto-Regular",
    color: Colors.textLight,
  },
  signInText: {
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
  // --- PERUBAHAN: Style notifikasi DIHAPUS ---
});
