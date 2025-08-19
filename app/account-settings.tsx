import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { ChangePasswordModal } from '@/components/modal/ChangePasswordModal';
import HelpCenterModal from '@/components/modal/help-center';
import AboutAppModal from '@/components/modal/about-app';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChangeNameModal } from '@/components/modal/ChangeNameModal'; // <-- Impor komponen modal baru

const initialUserData = {
  name: "TimRisetCPS",
  email: "TimRisetCPS@gmail.com",
  profilePicture: require('../assets/images/splash-icon.png'),
};

export default function AccountSettingsScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState(initialUserData.name);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // State untuk semua modal
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isHelpCenterModalVisible, setHelpCenterModalVisible] = useState(false);
  const [isAboutAppModalVisible, setAboutAppModalVisible] = useState(false);
  const [isNameModalVisible, setNameModalVisible] = useState(false);

  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => router.replace('/(auth)/login') }
    ]);
  };

  const handleChangeProfilePicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "You need to allow access to your photos.");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, aspect: [1, 1], quality: 0.5,
    });
    if (!pickerResult.canceled) {
      setProfileImage(pickerResult.assets[0].uri);
      Alert.alert("Profile Picture Updated", "Your new profile picture is ready to be uploaded!");
    }
  };

  const handleSubmitPasswordChange = (passwords: { current: string; new: string }) => {
    console.log("Password data to send to backend:", passwords);
    Alert.alert("Success", "Your password has been changed successfully!");
  };

  const handleSubmitNameChange = (newName: string) => {
    setUserName(newName);
    setNameModalVisible(false);
    // Di sini Anda bisa menambahkan logika untuk mengirim nama baru ke backend
    Alert.alert("Name Updated", "Your name has been successfully changed.");
  };

  return (
    <View style={styles.fullScreenContainer}>
      <View style={[styles.blueSection, { paddingTop: insets.top }]}>
        <View style={styles.profileContainer}>
          <View>
            <Image
              source={profileImage ? { uri: profileImage } : initialUserData.profilePicture}
              style={styles.profilePicture}
            />
            <TouchableOpacity style={styles.addPictureButton} onPress={handleChangeProfilePicture}>
              <Ionicons name="add" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{userName}</Text>
        </View>
      </View>

      <View style={styles.whiteSection}>
        <View style={styles.grabber} />
        <View style={styles.menuOptions}>
          {/* Email */}
          <View style={styles.optionRow}>
            <Ionicons name="mail-outline" size={24} color={Colors.primary} style={styles.optionIcon} />
            <View>
              <Text style={styles.optionTitle}>Email</Text>
              <Text style={styles.optionValue}>{initialUserData.email}</Text>
            </View>
          </View>
          
          {/* Opsi Ganti Nama (Posisi baru) */}
          <TouchableOpacity style={styles.optionRow} onPress={() => setNameModalVisible(true)}>
            <Ionicons name="person-outline" size={24} color={Colors.primary} style={styles.optionIcon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Name</Text>
              <Text style={styles.optionValue}>{userName}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={Colors.textLight} />
          </TouchableOpacity>

          {/* Password */}
          <TouchableOpacity style={styles.optionRow} onPress={() => setPasswordModalVisible(true)}>
            <Ionicons name="key-outline" size={24} color={Colors.primary} style={styles.optionIcon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Password</Text>
              <Text style={styles.optionValue}>Change your password</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={Colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={() => setHelpCenterModalVisible(true)}>
            <Ionicons name="help-circle-outline" size={24} color={Colors.primary} style={styles.optionIcon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Help Center</Text>
              <Text style={styles.optionValue}>Get assistance with the app</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={Colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={() => setAboutAppModalVisible(true)}>
            <Ionicons name="information-circle-outline" size={24} color={Colors.primary} style={styles.optionIcon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>About App</Text>
              <Text style={styles.optionValue}>Learn more about the app</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>

      <ChangePasswordModal
        visible={isPasswordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        onSubmit={handleSubmitPasswordChange}
      />
      
      <HelpCenterModal visible={isHelpCenterModalVisible} onClose={() => setHelpCenterModalVisible(false)} />
      <AboutAppModal visible={isAboutAppModalVisible} onClose={() => setAboutAppModalVisible(false)} />
      
      {/* Panggil komponen modal baru di sini */}
      <ChangeNameModal 
        visible={isNameModalVisible}
        onClose={() => setNameModalVisible(false)}
        onSubmit={handleSubmitNameChange}
        currentName={userName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  blueSection: {
    height: '40%',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, 
  },
  profilePicture: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  addPictureButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileName: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 15,
  },
  whiteSection: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  grabber: {
    width: 50,
    height: 5,
    backgroundColor: Colors.border,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 30,
  },
  menuOptions: {
    width: '100%',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  optionIcon: {
    marginRight: 20,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
  },
  optionValue: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
