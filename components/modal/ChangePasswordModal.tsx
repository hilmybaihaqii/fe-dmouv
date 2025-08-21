import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (passwords: { current: string; new: string }) => void;
};

export const ChangePasswordModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isCurrentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (currentPassword === newPassword) {
      Alert.alert(
        "Error",
        "New password cannot be the same as the current password."
      );
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert("Error", "New password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }

    Alert.alert(
      "Confirm Change",
      "Are you sure you want to change your password?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            onSubmit({ current: currentPassword, new: newPassword });
            onClose();
          },
        },
      ]
    );
  };

  const handleCloseModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPasswordVisible(false);
    setNewPasswordVisible(false);
    setConfirmPasswordVisible(false);
    setFocusedInput(null);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Change Password</Text>

          {/* Current Password Input */}
          <View
            style={[
              styles.inputGroup,
              {
                borderColor:
                  focusedInput === "currentPassword"
                    ? Colors.primary
                    : Colors.border,
              },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor={Colors.textLight}
              secureTextEntry={!isCurrentPasswordVisible}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              onFocus={() => setFocusedInput("currentPassword")}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity
              onPress={() =>
                setCurrentPasswordVisible(!isCurrentPasswordVisible)
              }
              style={styles.eyeIcon}
            >
              <Ionicons
                name={isCurrentPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* New Password Input */}
          <View
            style={[
              styles.inputGroup,
              {
                borderColor:
                  focusedInput === "newPassword"
                    ? Colors.primary
                    : Colors.border,
              },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="New Password (min. 8 characters)"
              placeholderTextColor={Colors.textLight}
              secureTextEntry={!isNewPasswordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
              onFocus={() => setFocusedInput("newPassword")}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity
              onPress={() => setNewPasswordVisible(!isNewPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={isNewPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Confirm New Password Input */}
          <View
            style={[
              styles.inputGroup,
              {
                borderColor:
                  focusedInput === "confirmPassword"
                    ? Colors.primary
                    : Colors.border,
              },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor={Colors.textLight}
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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

          {/* Tombol-tombol Aksi (Horizontal) */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 25,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    marginBottom: 25,
    color: Colors.primary,
  },
  inputGroup: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: Colors.white,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginLeft: 5,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.border,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginRight: 5,
  },
  cancelButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});
