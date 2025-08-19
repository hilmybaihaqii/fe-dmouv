import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface DeviceCardProps {
  icon: ImageSourcePropType;
  name: string;
  onPress: () => void;
}

export default function DeviceCard({ icon, name, onPress }: DeviceCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Bagian Atas (Gambar dengan Latar Belakang Warna) */}
      <View style={styles.imageContainer}>
        <Image source={icon} style={styles.image} />
      </View>
      
      {/* Bagian Bawah (Teks dan Tombol dengan Latar Belakang Putih) */}
      <View style={styles.footer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.arrowContainer}>
          <Ionicons name="arrow-forward" size={18} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 200,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: Colors.white, // Warna dasar kartu
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  imageContainer: {
    width: '100%',
    height: 130,
    backgroundColor: Colors.offWhite, // Warna kuning gading
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Diubah menjadi contain agar gambar tidak terpotong
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text,
  },
  arrowContainer: {
    backgroundColor: Colors.background,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});