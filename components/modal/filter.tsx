import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

// --- PERUBAHAN 1: Tambahkan tipe baru untuk filter ---
type LogType =
  | "motion"
  | "lamp-on"
  | "lamp-off"
  | "fan-on"
  | "fan-off"
  | "schedule"
  | "automatic";
export type FilterType = "All" | LogType;

type FilterOption = {
  label: string;
  type: FilterType;
  icon: keyof typeof Ionicons.glyphMap;
};

export type FilterGroup = {
  title: string;
  options: FilterOption[];
};

// --- PERUBAHAN 2: Tambahkan warna untuk ikon filter baru ---
const logStyleConfig: Record<LogType, { dotColor: string }> = {
  motion: { dotColor: Colors.primary },
  "lamp-on": { dotColor: Colors.greenDot },
  "lamp-off": { dotColor: Colors.redDot },
  "fan-on": { dotColor: Colors.fanOnColor },
  "fan-off": { dotColor: Colors.fanOffColor },
  schedule: { dotColor: "#FFC107" }, // Warna kuning untuk schedule
  automatic: { dotColor: "#9C27B0" }, // Warna ungu untuk automatic
};

// --- PROPS INTERFACE ---
// Defines what information the modal needs from its parent (HistoryScreen)
interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filterGroups: FilterGroup[];
  currentFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
}

// --- FILTER MODAL COMPONENT ---
export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  filterGroups,
  currentFilter,
  onSelectFilter,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.modalDragger} />
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter by Event</Text>
          </View>

          {filterGroups.map((group) => (
            <View key={group.title}>
              <Text style={styles.filterGroupTitle}>{group.title}</Text>
              <View style={styles.filterGrid}>
                {group.options.map(({ label, type, icon }) => {
                  const isActive = currentFilter === type;
                  const color =
                    logStyleConfig[type as LogType]?.dotColor || Colors.primary;
                  return (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.filterButton,
                        isActive && styles.filterButtonActive,
                      ]}
                      onPress={() => onSelectFilter(type)}
                    >
                      <Ionicons
                        name={icon}
                        size={22}
                        color={isActive ? Colors.white : color}
                      />
                      <Text
                        style={[
                          styles.filterButtonText,
                          isActive && styles.filterButtonTextActive,
                        ]}
                      >
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
  );
};

// --- STYLES ---
// All styles related to the modal are now in this file.
const styles = StyleSheet.create({
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
    alignSelf: "center",
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
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: Colors.textLight,
    marginTop: 15,
    marginBottom: 10,
    textTransform: "uppercase",
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
});
