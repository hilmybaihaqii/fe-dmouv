import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform, 
  Image, 
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
  // State untuk melacak input mana yang sedang fokus
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const router = useRouter();

  const handleResetPassword = () => {
    // --- Validasi Front-end ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !newPassword || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // --- Popup Konfirmasi ---
    Alert.alert(
      "Confirm Reset",
      `Are you sure you want to reset the password for ${email}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "OK", 
          onPress: () => {
            console.log('Resetting password for:', { email, newPassword });
            
            Alert.alert(
              "Success", 
              "Your password has been changed successfully.",
              [{ text: "OK", onPress: () => router.push('/(auth)/login') }]
            );
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.headerContainer}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Reset Your Password</Text>
          <Text style={styles.subtitle}>Enter your email and a new password.</Text>
        </View>

        <View style={styles.card}>
          {/* Input E-mail */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: focusedInput === 'email' ? Colors.primary : Colors.border }
              ]}
              placeholder="Enter your registered email"
              placeholderTextColor={Colors.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Input New Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <View 
              style={[
                styles.passwordWrapper,
                { borderColor: focusedInput === 'newPassword' ? Colors.primary : Colors.border }
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                placeholder="Minimum 8 characters"
                placeholderTextColor={Colors.textLight}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!isPasswordVisible}
                onFocus={() => setFocusedInput('newPassword')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIconWrapper}>
                <Ionicons 
                  name={isPasswordVisible ? 'eye-off' : 'eye'} 
                  size={24} 
                  color={Colors.primary} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Confirm New Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View 
              style={[
                styles.passwordWrapper,
                { borderColor: focusedInput === 'confirmPassword' ? Colors.primary : Colors.border }
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                placeholder="Repeat new password"
                placeholderTextColor={Colors.textLight}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!isConfirmPasswordVisible}
                onFocus={() => setFocusedInput('confirmPassword')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.eyeIconWrapper}>
                <Ionicons 
                  name={isConfirmPasswordVisible ? 'eye-off' : 'eye'} 
                  size={24} 
                  color={Colors.primary} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tombol Submit */}
          <TouchableOpacity style={styles.connectButton} onPress={handleResetPassword}>
            <Text style={styles.connectButtonText}>Reset Password</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.backLink}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 180, 
    height: 60, 
    resizeMode: 'contain', 
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: Colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 8,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
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
    fontFamily: 'Roboto-Regular',
    color: Colors.text,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: Colors.text,
  },
  eyeIconWrapper: {
    paddingHorizontal: 10,
  },
  connectButton: { 
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  connectButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.white,
  },
  footerContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  backLink: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15, 
    color: Colors.primary,
  },
});