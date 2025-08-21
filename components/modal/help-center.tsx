import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
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
      animationType="fade" // Menggunakan fade untuk transisi yang lebih halus
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          {/* Tombol Tutup di dalam modal content */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={32} color={Colors.textLight} />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Help Center</Text>
          <Text style={styles.modalText}>
            How can we assist you? Here you can find answers to frequently asked
            questions.
          </Text>

          {/* Container Ikon Sosial */}
          <View style={styles.iconContainer}>
            {/* Instagram Link Icon */}
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.instagram.com/cpslaboratory/")
              }
            >
              <Image
                source={require("../../assets/images/D.svg")}
                style={styles.icon}
              />
            </TouchableOpacity>

            {/* OA Line Link Icon */}
            <TouchableOpacity
              onPress={() => Linking.openURL("https://line.me/ti/p/~jsj1167b")}
            >
              <Image
                source={require("../../assets/images/D.svg")}
                style={styles.icon}
              />
            </TouchableOpacity>

            {/* Website Link Icon */}
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.cpslaboratory.com/")}
            >
              <Image
                source={require("../../assets/images/D.svg")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

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
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Latar belakang yang lebih gelap untuk kontras
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20, // Radius lebih besar agar konsisten
    padding: 25,
    width: "85%", // Lebar disesuaikan
    maxWidth: 350, // Batas lebar maksimum
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
    zIndex: 1, // Pastikan tombol di atas konten lain
    padding: 5, // Tambahkan padding agar lebih mudah disentuh
  },
  modalTitle: {
    fontFamily: "Poppins-Bold", // Menggunakan Poppins-Bold
    fontSize: 22,
    color: Colors.primary,
    marginBottom: 10,
    textAlign: "center",
    marginTop: 10, // Jarak dari tombol close
  },
  modalText: {
    fontFamily: "Roboto-Regular", // Menggunakan Roboto-Regular
    fontSize: 16,
    color: Colors.textLight, // Menggunakan Colors.textLight
    marginVertical: 10,
    textAlign: "center",
    lineHeight: 24, // Menambahkan lineHeight untuk keterbacaan
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Menggunakan space-around untuk distribusi yang merata
    width: "100%",
    marginVertical: 20,
  },
  icon: {
    width: 50, // Ukuran ikon diperbesar sedikit
    height: 50,
    resizeMode: "contain",
  },
  mainCloseButton: {
    // Nama style yang lebih jelas
    backgroundColor: Colors.primary,
    paddingVertical: 15, // Konsisten dengan tombol lain
    borderRadius: 15, // Konsisten dengan tombol lain
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  mainCloseButtonText: {
    color: Colors.white,
    fontSize: 18, // Konsisten dengan tombol lain
    fontFamily: "Poppins-SemiBold", // Menggunakan Poppins-Bold
  },
});

export default HelpCenterModal;
