import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";

type HelpCenterModalProps = {
  visible: boolean;
  onClose: () => void;
};

const HelpCenterModal: React.FC<HelpCenterModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Help Center</Text>
          <Text style={styles.modalText}>
            How can we assist you? Here you can find answers to frequently asked
            questions.
          </Text>

          {/* Bagian Contact Us dengan ikon Instagram dan teks @cpslaboratory */}
          <TouchableOpacity
            style={styles.contactContainer}
            onPress={() => Linking.openURL("https://www.instagram.com/cpslaboratory/")}
          >
            <Ionicons name="logo-instagram" size={28} color="#E4405F" style={styles.instagramIcon} />
            <Text style={styles.contactText}>@cpslaboratory</Text>
          </TouchableOpacity>

          {/* Tombol Close Utama */}
          <TouchableOpacity style={styles.mainCloseButton} onPress={onClose}>
            <Text style={styles.mainCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 25,
    width: "85%",
    maxWidth: 350,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
  },
  modalTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: Colors.primary,
    marginBottom: 10,
    textAlign: "center",
    marginTop: 10,
  },
  modalText: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: Colors.textLight,
    marginVertical: 10,
    textAlign: "center",
    lineHeight: 24,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: Colors.cardgray,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 'auto',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  instagramIcon: {
    marginRight: 10,
  },
  contactText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: Colors.primary,
  },
  mainCloseButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  mainCloseButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
});

export default HelpCenterModal;