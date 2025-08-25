import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FullLogo from "../assets/images/fulldmouv.svg";
import { Colors } from "../constants/Colors";

export default function SplashScreenComponent() {
  return (
    <View style={styles.container}>
      <FullLogo width={306} height={66} />
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
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    color: Colors.primary,
    marginTop: 12,
  },
});
