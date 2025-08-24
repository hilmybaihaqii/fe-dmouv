import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Colors } from "../../constants/Colors";
import FullLogo from "../../assets/images/fulldmouv.svg";

type AboutAppModalProps = {
  visible: boolean;
  onClose: () => void;
};

const AboutAppModal: React.FC<AboutAppModalProps> = ({ visible, onClose }) => {
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
            D&apos;Mouv is your smart solution for efficient energy use. With advanced smart detection technology, our app automatically senses when people are in a room.
          </Text>

          <Text style={styles.modalText}>
            Our system intuitively turns lights on when a room is occupied and switches them off when it&apos;s empty. This smart automation helps you save energy effortlessly, leading to real savings on your electricity bills.
          </Text>

          {/* Apresiasi */}
          <Text style={[styles.modalText, styles.thankYouText]}>
            Thanks for choosing D&apos;Mouv to make your home smarter and more efficient! We really appreciate your support.
          </Text>

          {/* Informasi Hukum dan Hak Cipta */}
          <View style={styles.legalContainer}>
            <Text style={styles.legalText}>
              © 2025 D&apos;Mouv. All rights reserved.
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL('#')}>
              <Text style={styles.legalLink}>Terms of Service{'\n'}Privacy Policy</Text>
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
  thankYouText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: Colors.primary,
    marginTop: 10,
    marginBottom: 15,
  },
  legalContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  legalText: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 5,
  },
  legalLink: {
    fontFamily: "Roboto-Medium",
    fontSize: 10,
    color: Colors.primary,
    textDecorationLine: 'underline',
    marginVertical: 2,
    textAlign: 'center',
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