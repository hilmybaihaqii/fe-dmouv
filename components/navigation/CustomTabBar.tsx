import React from "react";
// 'Text' sudah dihapus dari import di bawah
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../constants/Colors";

const TabItem = ({
  route,
  isFocused,
  onPress,
}: {
  route: any;
  isFocused: boolean;
  onPress: () => void;
}) => {
  const iconName =
    route.name === "home"
      ? "home"
      : route.name === "history"
      ? "filter"
      : route.name === "teams"
      ? "people"
      : "settings";

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isFocused ? 1 : 0, { duration: 200 }),
      // Kita hapus translateY agar lebih simpel dan stabil
    };
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabItem}>
      <Ionicons
        name={isFocused ? iconName : (`${iconName}-outline` as any)}
        size={26}
        color={isFocused ? Colors.primary : Colors.textLight}
      />
      {/* Struktur label disederhanakan */}
      <Animated.Text style={[styles.labelText, animatedLabelStyle]}>
        {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBarContainer}>
      <BlurView intensity={95} tint="light" style={styles.blurView}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabItem
              key={route.key}
              route={route}
              isFocused={isFocused}
              onPress={onPress}
            />
          );
        })}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    height: 67,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  blurView: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 11,
    color: Colors.primary,
    marginTop: 2,
    // Hapus 'position: absolute' agar layoutnya normal
  },
});

export default CustomTabBar;
