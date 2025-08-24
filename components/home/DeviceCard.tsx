// components/home/DeviceCard.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

type DeviceCardProps = {
  icon: ReactElement; // sekarang menerima JSX element (SVG)
  name: string;
  onPress: () => void;
};

export default function DeviceCard({ icon, name, onPress }: DeviceCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Bagian Atas (SVG atau Ikon) */}
      <View style={styles.imageContainer}>{icon}</View>

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
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 6,
  },
  imageContainer: {
    width: "100%",
    height: 130,
    backgroundColor: Colors.offWhite,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  name: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: Colors.text,
  },
  arrowContainer: {
    backgroundColor: Colors.background,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
