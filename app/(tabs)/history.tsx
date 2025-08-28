import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
// --- PERUBAHAN 1: Impor FilterModal dan tipenya ---
import {
  FilterGroup,
  FilterModal,
  FilterType,
} from "../../components/modal/filter";

// --- PERUBAHAN 1: Tambahkan tipe baru dan data dummy ---
type LogType =
  | "motion"
  | "lamp-on"
  | "lamp-off"
  | "fan-on"
  | "fan-off"
  | "schedule"
  | "automatic";

const DUMMY_HISTORY = [
  {
    date: "Wednesday, 15 August 2025",
    logs: [
      { type: "lamp-off", message: "Lights are now OFF", time: "23:00 PM" },
      { type: "fan-on", message: "Fan has been activated", time: "22:15 PM" },
      {
        type: "motion",
        message: "Motion detected around the device",
        time: "22:15 PM",
      },
      { type: "lamp-on", message: "Lights are now ON", time: "19:30 PM" },
      { type: "fan-off", message: "Fan has been turned off", time: "15:05 PM" },
    ],
  },
  {
    date: "Thursday, 14 August 2025",
    logs: [
      { type: "lamp-off", message: "Lights are now OFF", time: "21:45 PM" },
      {
        type: "motion",
        message: "Motion detected around the device",
        time: "16:10 PM",
      },
      { type: "lamp-on", message: "Lights are now ON", time: "16:09 PM" },
    ],
  },
  {
    date: "Friday, 13 August 2025",
    logs: [
      {
        type: "schedule",
        message: "Fan schedule activated: ON",
        time: "18:00 PM",
      },
      {
        type: "automatic",
        message: "Lamp turned on automatically",
        time: "17:30 PM",
      },
      {
        type: "fan-on",
        message: "Fan started automatically",
        time: "14:00 PM",
      },
      {
        type: "motion",
        message: "Motion detected in the morning",
        time: "08:30 AM",
      },
    ],
  },
];

type LogItemProps = { type: LogType; message: string; time: string };

// --- PERUBAHAN 2: Tambahkan style untuk tipe log baru ---
const logStyleConfig: Record<
  LogType,
  { bgColor: string; dotColor: string; messageColor: string; title: string }
> = {
  motion: {
    title: "Motion Detected",
    bgColor: Colors.secondary,
    dotColor: Colors.primary,
    messageColor: Colors.text,
  },
  "lamp-on": {
    title: "Lamp ON",
    bgColor: Colors.success,
    dotColor: Colors.greenDot,
    messageColor: Colors.text,
  },
  "lamp-off": {
    title: "Lamp OFF",
    bgColor: Colors.error,
    dotColor: Colors.redDot,
    messageColor: Colors.text,
  },
  "fan-on": {
    title: "Fan ON",
    bgColor: Colors.fanOnBg,
    dotColor: Colors.fanOnColor,
    messageColor: Colors.text,
  },
  "fan-off": {
    title: "Fan OFF",
    bgColor: Colors.fanOffBg,
    dotColor: Colors.fanOffColor,
    messageColor: Colors.text,
  },
  schedule: {
    title: "Schedule",
    bgColor: "#FFF8E1",
    dotColor: "#FFC107",
    messageColor: Colors.text,
  },
  automatic: {
    title: "Automatic Mode",
    bgColor: "#F3E5F5",
    dotColor: "#9C27B0",
    messageColor: Colors.text,
  },
};

const LogItem: React.FC<LogItemProps> = ({ type, message, time }) => {
  const style = logStyleConfig[type];
  return (
    <View
      style={[
        styles.logItem,
        { backgroundColor: style.bgColor, borderColor: style.dotColor },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: style.dotColor }]} />
      <View style={styles.logTextContainer}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.logTitle, { color: style.dotColor }]}>
            {style.title}
          </Text>
          <Text style={[styles.logMessage, { color: style.messageColor }]}>
            {message}
          </Text>
        </View>
        <Text style={styles.logTime}>{time}</Text>
      </View>
    </View>
  );
};

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("All");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const DAYS_PER_PAGE = 2;

  // --- PERUBAHAN 3: Tambahkan opsi filter baru di grup "General" ---
  const filterGroups: FilterGroup[] = [
    {
      title: "General",
      options: [
        { label: "All", type: "All", icon: "apps" },
        { label: "Motion", type: "motion", icon: "walk" },
        { label: "Schedule", type: "schedule", icon: "calendar" },
        { label: "Automatic", type: "automatic", icon: "sparkles" },
      ],
    },
    {
      title: "Lamp",
      options: [
        { label: "Lamp On", type: "lamp-on", icon: "bulb" },
        { label: "Lamp Off", type: "lamp-off", icon: "bulb-outline" },
      ],
    },
    {
      title: "Fan",
      options: [
        { label: "Fan On", type: "fan-on", icon: "sync-circle" },
        { label: "Fan Off", type: "fan-off", icon: "sync-circle-outline" },
      ],
    },
  ];

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
  const totalPages = Math.ceil(filteredHistory.length / DAYS_PER_PAGE);
  const startIndex = (currentPage - 1) * DAYS_PER_PAGE;
  const endIndex = startIndex + DAYS_PER_PAGE;
  const paginatedDays = filteredHistory.slice(startIndex, endIndex);

  // --- PERUBAHAN 2: Fungsi untuk menangani pemilihan filter dari modal ---
  const handleSelectFilter = (selectedFilter: FilterType) => {
    setFilterType(selectedFilter);
    setCurrentPage(1);
    setIsFilterModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.pageHeader, { paddingTop: insets.top }]}>
        <Text style={styles.screenTitle}>Room History</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={22} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search activity..."
            placeholderTextColor={Colors.textLight}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setCurrentPage(1);
            }}
          />
          <TouchableOpacity
            style={styles.filterIconContainer}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Ionicons name="options-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {paginatedDays.length > 0 ? (
          <>
            {paginatedDays.map((day, index) => (
              <View key={index} style={styles.historyCard}>
                <Text style={styles.cardDate}>{day.date}</Text>
                {day.logs.map((log, logIndex) => (
                  <LogItem
                    key={logIndex}
                    type={log.type as LogType}
                    message={log.message}
                    time={log.time}
                  />
                ))}
              </View>
            ))}

            {totalPages > 1 && (
              <View style={styles.paginationContainer}>
                <TouchableOpacity
                  onPress={() => setCurrentPage((c) => Math.max(1, c - 1))}
                  disabled={currentPage === 1}
                  style={styles.paginationNavButton}
                >
                  <Text
                    style={[
                      styles.paginationNavText,
                      currentPage === 1 && styles.paginationNavTextDisabled,
                    ]}
                  >
                    Back
                  </Text>
                </TouchableOpacity>
                <View style={styles.pageNumberContainer}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <TouchableOpacity
                        key={page}
                        style={[
                          styles.pageNumberButton,
                          currentPage === page && styles.pageNumberButtonActive,
                        ]}
                        onPress={() => setCurrentPage(page)}
                      >
                        <Text
                          style={[
                            styles.pageNumberText,
                            currentPage === page && styles.pageNumberTextActive,
                          ]}
                        >
                          {page}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
                <TouchableOpacity
                  onPress={() =>
                    setCurrentPage((c) => Math.min(totalPages, c + 1))
                  }
                  disabled={currentPage === totalPages}
                  style={styles.paginationNavButton}
                >
                  <Text
                    style={[
                      styles.paginationNavText,
                      currentPage === totalPages &&
                        styles.paginationNavTextDisabled,
                    ]}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <View style={styles.noHistoryContainer}>
            <Ionicons
              name="archive-outline"
              size={50}
              color={Colors.textLight}
            />
            <Text style={styles.noHistoryText}>No history found.</Text>
          </View>
        )}
      </ScrollView>

      {/* --- PERUBAHAN 3: Gunakan komponen FilterModal yang baru --- */}
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        filterGroups={filterGroups}
        currentFilter={filterType}
        onSelectFilter={handleSelectFilter}
      />
    </View>
  );
}

// --- PERUBAHAN 4: Hapus semua style modal dari sini ---
const styles = StyleSheet.create({
  pageHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: Colors.background,
  },
  screenTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 28,
    color: Colors.text,
    marginTop: 60,
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: Colors.text,
    marginLeft: 10,
  },
  filterIconContainer: {
    paddingLeft: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  historyCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  cardDate: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: Colors.text,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  logItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 5,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
    marginLeft: 5,
  },
  logTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  logTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 15,
    marginBottom: 2,
  },
  logMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    flex: 1,
  },
  logTime: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: Colors.textLight,
  },
  noHistoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  noHistoryText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.textLight,
    textAlign: "center",
    marginTop: 15,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  pageNumberContainer: {
    flexDirection: "row",
  },
  paginationNavButton: {
    padding: 10,
  },
  paginationNavText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: Colors.primary,
  },
  paginationNavTextDisabled: {
    color: Colors.border,
  },
  pageNumberButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  pageNumberButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pageNumberText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: Colors.primary,
  },
  pageNumberTextActive: {
    color: Colors.white,
  },
});
