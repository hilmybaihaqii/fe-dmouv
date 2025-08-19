import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

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
          {/* Tombol Tutup di dalam modal content */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={32} color={Colors.textLight} />
          </TouchableOpacity>

          {/* Logo Aplikasi */}
          <Image
            source={require('@/assets/images/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />

          {/* Judul & Deskripsi */}
          <Text style={styles.modalTitle}>About App</Text>
          <Text style={styles.modalText}>
            D&apos;Mouv is a motion detection dashboard that automatically controls your lights. The app detects movement in a room and switches lights on or off when no one is present, helping to conserve energy.
          </Text>
          <Text style={styles.modalText}>
            Additionally, D&apos;Mouv increases room security by alerting you if motion is detected. It&apos;s a simple yet powerful way to save energy and improve the security of your space.
          </Text>

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
  // Modal Styles
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  modalContent: {
    backgroundColor: Colors.white, 
    borderRadius: 20,
    padding: 25, 
    width: '85%', 
    maxWidth: 350,
    alignItems: 'center',
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
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
  },

 
  logoImage: {
    marginTop: 15,
    height: 50,
    marginBottom: 15,
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: Colors.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 10,
    paddingHorizontal: 5, 
  },

  // Button Styles
  mainCloseButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15, 
    borderRadius: 15, 
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  mainCloseButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default AboutAppModal;