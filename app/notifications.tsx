import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwipeListView } from "react-native-swipe-list-view";
import { FilterType } from "../components/modal/filter";
import { Colors } from "../constants/Colors";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type LogEntry = {
  id: string;
  date: string;
  type: FilterType;
};

const DUMMY_LOGS: LogEntry[] = [
  { id: "1", date: "August 13 at 15:00 PM", type: "motion" },
  { id: "2", date: "August 13 at 10:00 PM", type: "schedule" },
  { id: "3", date: "August 12 at 15:00 PM", type: "automatic" },
  { id: "4", date: "August 11 at 20:00 PM", type: "lamp-on" },
  { id: "5", date: "August 11 at 22:00 PM", type: "fan-off" },
  { id: "6", date: "August 10 at 14:00 PM", type: "motion" },
  { id: "7", date: "August 9 at 12:00 PM", type: "schedule" },
  { id: "8", date: "August 8 at 11:00 PM", type: "automatic" },
  { id: "9", date: "August 7 at 14:00 PM", type: "lamp-off" },
  { id: "10", date: "August 6 at 04:00 PM", type: "fan-on" },
  { id: "11", date: "August 5 at 18:00 PM", type: "motion" },
  { id: "12", date: "August 4 at 17:00 PM", type: "schedule" },
];

const userName = "TimRisetCPS";

export default function NotificationsScreen() {
  const [activityLogs, setActivityLogs] = useState<LogEntry[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    setActivityLogs(DUMMY_LOGS);
    const now = new Date();
    const formattedDate = now.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const handleDeleteNotification = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActivityLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
  };

  const handleNotificationPress = (notification: LogEntry) => {
    router.push({
      pathname: "/(tabs)/history",
      params: { filter: notification.type },
    });
  };

  // --- PERUBAHAN: Bungkus konten dengan TouchableOpacity ---
  const renderItem = (data: { item: LogEntry }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => handleNotificationPress(data.item)}
    >
      <View style={styles.itemContainer}>
        <Ionicons
          name="warning-outline"
          size={24}
          color={Colors.white}
          style={styles.itemIcon}
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>
            <Text style={styles.itemTextBold}>Security update: </Text>
            Someone just moved in your space
          </Text>
          <Text style={styles.itemDate}>{data.item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHiddenItem = (data: { item: LogEntry }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNotification(data.item.id)}
      >
        <Ionicons name="trash-outline" size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.headerFixed}>
          <Text style={styles.title}>Activity Log</Text>
          <Text style={styles.greeting}>Hello, {userName}</Text>
          <Text style={styles.currentDate}>{currentDate}</Text>
        </View>

        {activityLogs.length > 0 ? (
          // --- PERUBAHAN: Hapus prop onRowClick yang salah ---
          <SwipeListView
            data={activityLogs}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            keyExtractor={(item) => item.id}
            rightOpenValue={-80}
            disableRightSwipe
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="notifications-off-outline"
              size={60}
              color={Colors.textLight}
            />
            <Text style={styles.emptyText}>No New Notifications</Text>
            <Text style={styles.emptySubText}>You are all caught up!</Text>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerFixed: {
    paddingHorizontal: 20,
    paddingTop: 50,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Poppins-regular",
    fontSize: 17,
    color: Colors.text,
    marginTop: 10,
  },
  greeting: {
    fontFamily: "Roboto-Medium",
    fontSize: 25,
    color: Colors.text,
    marginTop: 2,
    textShadowColor: "rgba(0, 0, 0, 0.20)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  currentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: Colors.textLight,
    marginTop: 8,
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  itemIcon: {
    marginRight: 15,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    color: Colors.white,
    lineHeight: 20,
    fontFamily: "Roboto-Regular",
  },
  itemTextBold: {
    fontFamily: "Poppins-Bold",
  },
  itemDate: {
    fontSize: 13,
    color: Colors.white,
    opacity: 0.8,
    marginTop: 3,
    fontFamily: "Roboto-Regular",
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: Colors.redDot,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 80,
    borderRadius: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },
  emptyText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: Colors.text,
    marginTop: 20,
  },
  emptySubText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 5,
  },
});
