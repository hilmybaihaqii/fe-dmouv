import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";

type UserRole = "superuser" | "user";

const AddUserScreen: React.FC = () => {
  const router = useRouter();

  // State untuk setiap input field
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<UserRole>("user");

  // State untuk pesan error
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State untuk visibilitas password
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSave = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let hasError = false;

    if (!name) {
      newErrors.name = "Fill this field";
      hasError = true;
    }
    if (!email) {
      newErrors.email = "Fill this field";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "Fill this field";
      hasError = true;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      hasError = true;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Fill this field";
      hasError = true;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    Alert.alert(
      "Confirm Add Account",
      `Are you sure you want to add this account as a ${role}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            console.log("New user data to send to backend:", {
              name,
              email,
              pass: password,
              role,
            });
            Alert.alert(
              "Account Added",
              `New account for ${name} has been successfully created!`,
              [{ text: "OK", onPress: () => router.back() }]
            );
          },
        },
      ]
    );
  };

  const clearErrorsOnChange = (inputName: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [inputName]: "",
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.contentWrapper}>
          <Text style={styles.pageTitle}>Create New User</Text>
          <Text style={styles.pageSubtitle}>
            Enter the details below to create a new account
          </Text>

          <View style={styles.formContainer}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <View
                style={[
                  styles.inputGroup,
                  focusedInput === "name" && styles.inputFocused,
                  !!errors.name && styles.inputError,
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter full name"
                  placeholderTextColor={Colors.textLight}
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    clearErrorsOnChange("name");
                  }}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              {errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : null}
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <View
                style={[
                  styles.inputGroup,
                  focusedInput === "email" && styles.inputFocused,
                  !!errors.email && styles.inputError,
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter email address"
                  placeholderTextColor={Colors.textLight}
                  value={email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    setEmail(text);
                    clearErrorsOnChange("email");
                  }}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.inputGroup,
                  focusedInput === "password" && styles.inputFocused,
                  !!errors.password && styles.inputError,
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Min. 8 characters"
                  placeholderTextColor={Colors.textLight}
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    clearErrorsOnChange("password");
                  }}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={24}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View
                style={[
                  styles.inputGroup,
                  focusedInput === "confirmPassword" && styles.inputFocused,
                  !!errors.confirmPassword && styles.inputError,
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Re-enter password"
                  placeholderTextColor={Colors.textLight}
                  secureTextEntry={!isConfirmPasswordVisible}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    clearErrorsOnChange("confirmPassword");
                  }}
                  onFocus={() => setFocusedInput("confirmPassword")}
                  onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity
                  onPress={() =>
                    setConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                    size={24}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
            </View>

            {/* Role Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select Role</Text>
              <View style={styles.roleOptions}>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    role === "user" && styles.roleButtonActive,
                  ]}
                  onPress={() => setRole("user")}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      role === "user" && styles.roleButtonTextActive,
                    ]}
                  >
                    User
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    role === "superuser" && styles.roleButtonActive,
                  ]}
                  onPress={() => setRole("superuser")}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      role === "superuser" && styles.roleButtonTextActive,
                    ]}
                  >
                    Superuser
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Add Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  pageTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    color: Colors.text,
    marginBottom: 4,
    textAlign: "center",
  },
  pageSubtitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: Colors.textLight,
    textAlign: "center",
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 18,
  },
  label: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.border,
    backgroundColor: "#F9F9F9",
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
    backgroundColor: Colors.white,
  },
  inputError: {
    borderColor: Colors.redDot,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: Colors.text,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: Colors.redDot,
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 4,
  },
  roleOptions: {
    flexDirection: "row",
    width: "100%",
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  roleButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: "rgba(67, 136, 255, 0.1)",
  },
  roleButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: Colors.textLight,
  },
  roleButtonTextActive: {
    color: Colors.primary,
  },
  buttonWrapper: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
});

export default AddUserScreen;
