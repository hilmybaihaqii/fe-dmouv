import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

// import SVG langsung
import FullLogo from "../assets/images/fulldmouv.svg";

export default function SplashScreenComponent() {
  return (
    <View style={styles.container}>
      <FullLogo width={220} height={80} />
      <Text style={styles.tagline}>LightsUpWhenLifeMoves</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  tagline: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: Colors.primary,
    marginTop: 12,
  },
});
