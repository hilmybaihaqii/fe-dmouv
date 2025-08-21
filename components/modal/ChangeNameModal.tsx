import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Colors } from "../../constants/Colors";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (newName: string) => void;
  currentName: string;
};

export const ChangeNameModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  currentName,
}) => {
  const [name, setName] = useState(currentName);
  const [focusedInput, setFocusedInput] = useState<boolean>(false);

  // Efek ini memastikan input field selalu diisi dengan nama terbaru saat modal dibuka
  useEffect(() => {
    if (visible) {
      setName(currentName);
    }
  }, [visible, currentName]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty.");
      return;
    }
    onSubmit(name.trim());
  };

  const handleCloseModal = () => {
    // Reset state saat modal ditutup
    setName(currentName);
    setFocusedInput(false);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleCloseModal}
    >
      <Pressable style={styles.modalContainer} onPress={handleCloseModal}>
        <Pressable style={styles.modalContent} onPress={() => {}}>
          <Text style={styles.modalTitle}>Change Name</Text>

          <View
            style={[
              styles.inputGroup,
              { borderColor: focusedInput ? Colors.primary : Colors.border },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter your new name"
              placeholderTextColor={Colors.textLight}
              value={name}
              onChangeText={setName}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
              autoFocus={true}
            />
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
        </Pressable>
      </Pressable>
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
