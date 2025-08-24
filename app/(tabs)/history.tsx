import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

const DUMMY_HISTORY = [
  {
    date: "Wednesday, 15 August 2025",
    logs: [
      { type: "off", message: "Lights are now OFF", time: "23:00 PM" },
      {
        type: "motion",
        message: "Motion detected around the device",
        time: "22:15 PM",
      },
      { type: "on", message: "Lights are now ON", time: "19:30 PM" },
      { type: "off", message: "Lights are now OFF", time: "15:05 PM" },
      {
        type: "motion",
        message: "Motion detected around the device",
        time: "11:20 AM",
      },
    ],
  },
  {
    date: "Thursday, 14 August 2025",
    logs: [
      { type: "off", message: "Lights are now OFF", time: "21:45 PM" },
      {
        type: "motion",
        message: "Motion detected around the device",
        time: "16:10 PM",
      },
      { type: "on", message: "Lights are now ON", time: "16:09 PM" },
      {
        type: "motion",
        message: "Motion detected in the morning",
        time: "08:30 AM",
      },
    ],
  },
];

type LogItemProps = {
  type: "motion" | "on" | "off";
  message: string;
  time: string;
};

const LogItem: React.FC<LogItemProps> = ({ type, message, time }) => {
  let backgroundColor;
  let dotColor;
  let messageColor;

  switch (type) {
    case "motion":
      backgroundColor = Colors.secondary;
      dotColor = Colors.primary;
      messageColor = Colors.primary;
      break;
    case "on":
      backgroundColor = Colors.success;
      dotColor = Colors.greenDot;
      messageColor = Colors.greenDot;
      break;
    case "off":
      backgroundColor = Colors.error;
      dotColor = Colors.redDot;
      messageColor = Colors.redDot;
      break;
  }

  return (
    <View style={[styles.logItem, { backgroundColor }]}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <View style={styles.logTextContainer}>
        <Text style={[styles.logMessage, { color: messageColor }]}>
          {message}
        </Text>
        <Text style={styles.logTime}>{time}</Text>
      </View>
    </View>
  );
};

export default function HistoryScreen() {
  const insets = useSafeAreaInsets(); // Hook untuk mendapatkan safe area
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"All" | "motion" | "on" | "off">(
    "All"
  );
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const getFilteredData = () => {
    return DUMMY_HISTORY.map((day) => ({
      ...day,
      logs: day.logs.filter((log) => {
        const matchesFilter = filterType === "All" || log.type === filterType;
        const matchesSearch =
          log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          day.date.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      }),
    })).filter((day) => day.logs.length > 0);
  };

  const filteredHistory = getFilteredData();

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // Padding atas untuk memberi ruang bagi header transparan
          paddingTop: insets.top,
        }}
      >
        {/* Kontainer untuk header halaman */}
        <View style={styles.pageHeader}>
          <Text style={styles.screenTitle}>Room History</Text>
          <View style={styles.searchBar}>
            <Ionicons
              name="search-outline"
              size={24}
              color={Colors.textLight}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search activity..."
              placeholderTextColor={Colors.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
              <Ionicons name="filter" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Kontainer untuk konten riwayat */}
        <View style={styles.contentContainer}>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((day, index) => (
              <View key={index} style={styles.historyCard}>
                <Text style={styles.cardDate}>{day.date}</Text>
                {day.logs.map((log, logIndex) => (
                  <LogItem
                    key={logIndex}
                    type={log.type as "motion" | "on" | "off"}
                    message={log.message}
                    time={log.time}
                  />
                ))}
              </View>
            ))
          ) : (
            <View style={styles.noHistoryContainer}>
              <Ionicons
                name="information-circle-outline"
                size={50}
                color={Colors.textLight}
                style={styles.noHistoryIcon}
              />
              <Text style={styles.noHistoryText}>No history found.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Filter Modal (tidak ada perubahan di sini) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setIsFilterModalVisible(false)}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.modalTitle}>Filter by Event</Text>
            {["All", "motion", "on", "off"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterButton,
                  filterType === type && styles.filterButtonActive,
                ]}
                onPress={() => {
                  setFilterType(type as "All" | "motion" | "on" | "off");
                  setIsFilterModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    filterType === type && styles.filterButtonTextActive,
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setIsFilterModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pageHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  screenTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 25,
    color: Colors.text,
    marginTop: 20, // Menyamakan dengan halaman home
    marginBottom: 20, // Memberi jarak ke search bar
    // Menambahkan shadow pada teks
    textShadowColor: "rgba(0, 0, 0, 0.20)", // Opasitas dikurangi agar lebih transparan
    textShadowOffset: { width: 0, height: 1 }, // Offset diperkecil agar lebih dekat ke teks
    textShadowRadius: 6, // Radius diperbesar agar lebih buram dan halus
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: Colors.text,
    paddingLeft: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  historyCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDate: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: Colors.text,
    marginBottom: 15,
  },
  logItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  logTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    flex: 1,
  },
  logTime: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: Colors.text,
    opacity: 0.8,
  },
  noHistoryContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  noHistoryIcon: {
    marginBottom: 10,
  },
  noHistoryText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.textLight,
    textAlign: "center",
  },
  // Styles untuk Modal (tidak ada perubahan)
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
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    width: "100%",
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: Colors.text,
  },
  filterButtonTextActive: {
    color: Colors.white,
  },
  modalCloseButton: {
    marginTop: 20,
  },
  modalCloseButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: Colors.primary,
  },
});
