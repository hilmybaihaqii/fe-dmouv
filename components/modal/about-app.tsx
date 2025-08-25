import { Ionicons } from "@expo/vector-icons"; // <-- IMPORT BARU
import React from "react";
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FullLogo from "../../assets/images/fulldmouv.svg";
import { Colors } from "../../constants/Colors";

type AboutAppModalProps = {
  visible: boolean;
  onClose: () => void;
};

const AboutAppModal: React.FC<AboutAppModalProps> = ({ visible, onClose }) => {
  const instagramUrl =
    "https://www.instagram.com/cpslaboratory?igsh=MXBobDF3YWZ0aTk4NQ==";

  const handleInstagramPress = () => {
    Linking.openURL(instagramUrl).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          {/* Logo Aplikasi */}
          <FullLogo width={180} height={60} style={styles.logoImage} />

          {/* Judul & Deskripsi */}
          <Text style={styles.modalTitle}>About D&apos;Mouv</Text>

          <Text style={styles.modalText}>
            D&apos;Mouv is your smart solution for efficient energy use. With
            advanced smart detection technology, our app automatically senses
            when people are in a room.
          </Text>

          <Text style={styles.modalText}>
            Our system intuitively turns lights on when a room is occupied and
            switches them off when it&apos;s empty. This smart automation helps
            you save energy effortlessly, leading to real savings on your
            electricity bills.
          </Text>

          {/* <-- BAGIAN BARU: HELP CENTER --> */}
          <View style={styles.helpCenterContainer}>
            <Text style={styles.helpCenterTitle}>Help Center</Text>
            <TouchableOpacity
              style={styles.instagramLink}
              onPress={handleInstagramPress}
            >
              <Ionicons
                name="logo-instagram"
                size={22}
                color={Colors.text}
                style={styles.instagramIcon}
              />
              <Text style={styles.instagramText}>@cpslaboratory</Text>
            </TouchableOpacity>
          </View>

          {/* Informasi Hukum dan Hak Cipta */}
          <View style={styles.legalContainer}>
            <Text style={styles.legalText}>
              © 2025 D&apos;Mouv. All rights reserved.
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL("#")}>
              <Text style={styles.legalLink}>
                Terms of Service{"\n"}Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tombol Tutup Utama */}
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
  logoImage: {
    marginTop: 15,
    height: 50,
    marginBottom: 15,
  },
  modalTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: Colors.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  modalText: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: Colors.textLight,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  // <-- STYLES BARU UNTUK HELP CENTER -->
  helpCenterContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 15,
  },
  helpCenterTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: Colors.text,
    marginBottom: 10,
  },
  instagramLink: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  instagramIcon: {
    marginRight: 8,
  },
  instagramText: {
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    color: Colors.text,
  },
  // ------------------------------------
  legalContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  legalText: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: Colors.textLight,
    textAlign: "center",
    marginBottom: 5,
  },
  legalLink: {
    fontFamily: "Roboto-Medium",
    fontSize: 10,
    color: Colors.primary,
    textDecorationLine: "underline",
    marginVertical: 2,
    textAlign: "center",
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

export default AboutAppModal;
