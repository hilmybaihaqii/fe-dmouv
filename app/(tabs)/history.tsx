import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

// Data & Tipe (tidak ada perubahan)
const DUMMY_HISTORY = [
    {
    date: "Wednesday, 15 August 2025",
    logs: [
      { type: "lamp-off", message: "Lights are now OFF", time: "23:00 PM" },
      { type: "fan-on", message: "Fan has been activated", time: "22:15 PM" },
      { type: "motion", message: "Motion detected around the device", time: "22:15 PM" },
      { type: "lamp-on", message: "Lights are now ON", time: "19:30 PM" },
      { type: "fan-off", message: "Fan has been turned off", time: "15:05 PM" },
    ],
  },
  {
    date: "Thursday, 14 August 2025",
    logs: [
      { type: "lamp-off", message: "Lights are now OFF", time: "21:45 PM" },
      { type: "motion", message: "Motion detected around the device", time: "16:10 PM" },
      { type: "lamp-on", message: "Lights are now ON", time: "16:09 PM" },
    ],
  },
    {
    date: "Friday, 13 August 2025",
    logs: [
      { type: "fan-on", message: "Fan started automatically", time: "14:00 PM" },
      { type: "motion", message: "Motion detected in the morning", time: "08:30 AM" },
    ],
  },
];
type LogType = "motion" | "lamp-on" | "lamp-off" | "fan-on" | "fan-off";
type FilterType = "All" | LogType;
type LogItemProps = { type: LogType; message: string; time: string; };

const logStyleConfig: Record<
  LogType,
  { bgColor: string; dotColor: string; messageColor: string; title: string }
> = {
  motion: { title: "Motion Detected", bgColor: Colors.secondary, dotColor: Colors.primary, messageColor: Colors.text },
  "lamp-on": { title: "Lamp ON", bgColor: Colors.success, dotColor: Colors.greenDot, messageColor: Colors.text },
  "lamp-off": { title: "Lamp OFF", bgColor: Colors.error, dotColor: Colors.redDot, messageColor: Colors.text },
  "fan-on": { title: "Fan ON", bgColor: Colors.fanOnBg, dotColor: Colors.fanOnColor, messageColor: Colors.text },
  "fan-off": { title: "Fan OFF", bgColor: Colors.fanOffBg, dotColor: Colors.fanOffColor, messageColor: Colors.text },
};

const LogItem: React.FC<LogItemProps> = ({ type, message, time }) => {
  const style = logStyleConfig[type];
  return (
    <View style={[styles.logItem, { backgroundColor: style.bgColor, borderColor: style.dotColor }]}>
      <View style={[styles.dot, { backgroundColor: style.dotColor }]} />
      <View style={styles.logTextContainer}>
        <View style={{flex: 1}}>
          <Text style={[styles.logTitle, { color: style.dotColor }]}>{style.title}</Text>
          <Text style={[styles.logMessage, { color: style.messageColor }]}>{message}</Text>
        </View>
        <Text style={styles.logTime}>{time}</Text>
      </View>
    </View>
  );
};

type FilterOption = {
  label: string;
  type: FilterType;
  icon: keyof typeof Ionicons.glyphMap;
};

type FilterGroup = {
  title: string;
  options: FilterOption[];
};

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("All");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const DAYS_PER_PAGE = 2;

  const filterGroups: FilterGroup[] = [
    {
      title: "General",
      options: [
        { label: "All", type: "All", icon: "apps" },
        { label: "Motion", type: "motion", icon: "walk" },
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

  return (
    <View style={{flex: 1}}>
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
          <TouchableOpacity style={styles.filterIconContainer} onPress={() => setIsFilterModalVisible(true)}>
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
                <TouchableOpacity onPress={() => setCurrentPage(c => Math.max(1, c - 1))} disabled={currentPage === 1} style={styles.paginationNavButton}>
                  <Text style={[styles.paginationNavText, currentPage === 1 && styles.paginationNavTextDisabled]}>Back</Text>
                </TouchableOpacity>
                <View style={styles.pageNumberContainer}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <TouchableOpacity key={page} style={[styles.pageNumberButton, currentPage === page && styles.pageNumberButtonActive]} onPress={() => setCurrentPage(page)}>
                      <Text style={[styles.pageNumberText, currentPage === page && styles.pageNumberTextActive]}>{page}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity onPress={() => setCurrentPage(c => Math.min(totalPages, c + 1))} disabled={currentPage === totalPages} style={styles.paginationNavButton}>
                    <Text style={[styles.paginationNavText, currentPage === totalPages && styles.paginationNavTextDisabled]}>Next</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <View style={styles.noHistoryContainer}>
            <Ionicons name="archive-outline" size={50} color={Colors.textLight} />
            <Text style={styles.noHistoryText}>No history found.</Text>
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={() => setIsFilterModalVisible(false)}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalDragger} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter by Event</Text>
            </View>

            {filterGroups.map((group) => (
              <View key={group.title}>
                <Text style={styles.filterGroupTitle}>{group.title}</Text>
                <View style={styles.filterGrid}>
                  {group.options.map(({ label, type, icon }) => {
                    const isActive = filterType === type;
                    const color = logStyleConfig[type as LogType]?.dotColor || Colors.primary;
                    return (
                      <TouchableOpacity
                        key={type}
                        style={[styles.filterButton, isActive && styles.filterButtonActive]}
                        onPress={() => { setFilterType(type); setCurrentPage(1); setIsFilterModalVisible(false); }}
                      >
                        <Ionicons name={icon} size={22} color={isActive ? Colors.white : color} />
                        <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
                          {label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

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
  // --- PERUBAHAN DI SINI ---
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    // Menambahkan padding bawah yang lebih besar agar tidak tertutup tab menu
    paddingBottom: 180, 
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
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    paddingBottom: 40,
  },
  modalDragger: {
      width: 50,
      height: 5,
      backgroundColor: Colors.border,
      borderRadius: 3,
      alignSelf: 'center',
      marginVertical: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: Colors.primary,
  },
  filterGroupTitle: {
      fontFamily: 'Poppins-Bold',
      fontSize: 16,
      color: Colors.textLight,
      marginTop: 15,
      marginBottom: 10,
      textTransform: 'uppercase'
  },
  filterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  filterButton: {
    width: "48.5%",
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: "center",
    flexDirection: "row",
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: Colors.text,
    marginLeft: 12,
  },
  filterButtonTextActive: {
    color: Colors.white,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  pageNumberContainer: {
      flexDirection: 'row',
  },
  paginationNavButton: {
      padding: 10,
  },
  paginationNavText: {
      fontFamily: 'Poppins-SemiBold',
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
    justifyContent: 'center',
    alignItems: 'center',
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
      fontFamily: 'Poppins-Bold',
      fontSize: 16,
      color: Colors.primary,
  },
  pageNumberTextActive: {
      color: Colors.white,
  }
});
