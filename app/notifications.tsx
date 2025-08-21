import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";

type LogEntry = {
  id: string;
  date: string;
};

const DUMMY_LOGS: LogEntry[] = [
  { id: "1", date: "August 13 at 15:00 PM" },
  { id: "2", date: "August 13 at 10:00 PM" },
  { id: "3", date: "August 12 at 15:00 PM" },
  { id: "4", date: "August 11 at 20:00 PM" },
  { id: "5", date: "August 11 at 12:00 PM" },
  { id: "6", date: "August 10 at 14:00 PM" },
];

const userName = "TimRisetCPS";

type NotificationItemProps = {
  item: LogEntry;
};

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => (
  <TouchableOpacity style={styles.itemContainer}>
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
      <Text style={styles.itemDate}>{item.date}</Text>
    </View>
  </TouchableOpacity>
);

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [activityLogs, setActivityLogs] = useState<LogEntry[]>([]);
  const [currentDate, setCurrentDate] = useState("");

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

  const renderLogItem = ({ item }: ListRenderItemInfo<LogEntry>) => (
    <NotificationItem item={item} />
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: insets.top + (Platform.OS === "ios" ? 10 : 20) },
      ]}
    >
      {/* Header Halaman yang tetap di atas */}
      <View style={styles.headerFixed}>
        <Text style={styles.title}>Activity Log</Text>
        <Text style={styles.greeting}>Hello, {userName}</Text>
        <Text style={styles.currentDate}>{currentDate}</Text>
      </View>

      {/* FlatList yang bisa di-scroll */}
      <FlatList
        data={activityLogs}
        renderItem={renderLogItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
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
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: Colors.text,
  },
  greeting: {
    fontFamily: "Roboto-Regular",
    fontSize: 25,
    color: Colors.primary,
    marginTop: 4,
  },
  currentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: Colors.textLight,
    marginTop: 8,
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 18,
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
    fontSize: 15,
    color: Colors.white,
    lineHeight: 22,
    fontFamily: "Roboto-Regular",
  },
  itemTextBold: {
    fontFamily: "Poppins-Bold",
  },
  itemDate: {
    fontSize: 13,
    color: Colors.white,
    opacity: 0.8,
    marginTop: 4,
    fontFamily: "Roboto-Regular",
  },
});
