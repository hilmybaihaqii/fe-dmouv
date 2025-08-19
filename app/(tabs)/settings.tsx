import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  Pressable,
  TextInput,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useLamp } from '@/context/LampContext';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Schedule = { id: string; day: string; onTime: string; offTime: string; };
const initialSchedules: Schedule[] = [
  { id: '1', day: 'Monday', onTime: '07:30', offTime: '17:30' },
  { id: '2', day: 'Thursday', onTime: '12:30', offTime: '17:00' },
];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SettingsScreen() {
  const router = useRouter();
  const { isAutoMode, setIsAutoMode } = useLamp();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isDayModalVisible, setDayModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [inputOnTime, setInputOnTime] = useState('');
  const [inputOffTime, setInputOffTime] = useState('');

  useEffect(() => { setSchedules(initialSchedules); }, []);

  const isSubmitDisabled = !selectedDay || !inputOnTime || !inputOffTime;

  const handleModeChange = (isAuto: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsAutoMode(isAuto);
  };

  const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return NaN;
    return hours * 60 + minutes;
  };

  const isScheduleOverlapping = (newSchedule: Omit<Schedule, 'id'>) => {
    const newStartTime = timeToMinutes(newSchedule.onTime);
    const newEndTime = timeToMinutes(newSchedule.offTime);
    if (isNaN(newStartTime) || isNaN(newEndTime)) { Alert.alert("Invalid Time", "Please use HH:MM format."); return true; }
    if (newEndTime <= newStartTime) { Alert.alert("Invalid Time", "Off time must be after on time."); return true; }
    const schedulesForDay = schedules.filter(s => s.day === newSchedule.day);
    for (const schedule of schedulesForDay) {
      const existingStartTime = timeToMinutes(schedule.onTime);
      const existingEndTime = timeToMinutes(schedule.offTime);
      if (newStartTime < existingEndTime && newEndTime > existingStartTime) { Alert.alert("Schedule Conflict", "This time overlaps with an existing schedule."); return true; }
    }
    return false;
  };

  const handleTimeInputChange = (text: string, setter: (value: string) => void) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 2) setter(cleaned);
    else if (cleaned.length <= 4) setter(`${cleaned.slice(0, 2)}:${cleaned.slice(2)}`);
  };

  const handleChangeProfilePicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) { Alert.alert("Permission required", "You need to allow access to your photos."); return; }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!pickerResult.canceled) { setProfileImage(pickerResult.assets[0].uri); Alert.alert("Profile Picture Updated", "Your new profile picture has been set!"); }
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) { Alert.alert("Incomplete", "Please select a day and fill in the times."); return; }
    const newScheduleData = { day: selectedDay!, onTime: inputOnTime, offTime: inputOffTime };
    if (isScheduleOverlapping(newScheduleData)) return;
    const newSchedule: Schedule = { id: Date.now().toString(), ...newScheduleData };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setSchedules(prevSchedules => [...prevSchedules, newSchedule].sort((a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day)));
    setSelectedDay(null); setInputOnTime(''); setInputOffTime('');
    Alert.alert("Success", "New schedule has been saved.");
  };

  const handleDelete = (idToDelete: string) => {
    Alert.alert("Delete Schedule", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSchedules(prevSchedules => prevSchedules.filter(s => s.id !== idToDelete));
      }},
    ]);
  };

  const renderProfileSection = () => (
    <View style={styles.profileContainer}>
      <View>
        <Image source={profileImage ? { uri: profileImage } : require('../../assets/images/splash-icon.png')} style={styles.profileImage} />
        <TouchableOpacity style={styles.addPictureButton} onPress={handleChangeProfilePicture}>
          <Ionicons name="camera-outline" size={18} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <Text style={styles.profileName}>TimRisetCPS</Text>
      <Text style={styles.profileEmail}>TimRisetCPS@gmail.com</Text>
      <TouchableOpacity style={styles.editProfileButton} onPress={() => router.push('/account-settings')}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );

  const renderModeControl = () => (
    <View style={styles.modeControlContainer}>
      <TouchableOpacity
        style={[styles.modeButton, isAutoMode && styles.modeButtonActive]}
        onPress={() => handleModeChange(true)}
      >
        <Text style={[styles.modeButtonText, isAutoMode && styles.modeButtonTextActive]}>Automatic</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.modeButton, !isAutoMode && styles.modeButtonActive]}
        onPress={() => handleModeChange(false)}
      >
        <Text style={[styles.modeButtonText, !isAutoMode && styles.modeButtonTextActive]}>Scheduled</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={[Colors.secondary, Colors.background]} style={styles.safeArea}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          {renderProfileSection()}
          {renderModeControl()}
          
          {isAutoMode && (
            <View style={styles.card}>
              <View style={styles.automaticCardContent}>
                <Ionicons name="sparkles-outline" size={40} color={Colors.primary} />
                <Text style={styles.automaticCardTitle}>Automatic Mode</Text>
                <Text style={styles.automaticCardText}>
                  Automatic mode intelligently adjusts the lamp&apos;s brightness and color based on sensor data and your surroundings.
                </Text>
                <TouchableOpacity 
                  style={styles.goToControlBtn}
                  onPress={() => router.push('/lamp-control')}
                >
                  <Text style={styles.goToControlBtnText}>Go to Lamp Controls</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!isAutoMode && (
            <View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Set Lamp Schedule</Text>
                <TouchableOpacity style={styles.pickerButton} onPress={() => setDayModalVisible(true)}>
                  <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
                  <Text style={styles.pickerButtonText}>{selectedDay || 'Select Day'}</Text>
                  <Ionicons name="chevron-down" size={20} color={Colors.primary} />
                </TouchableOpacity>
                <View style={styles.timeInputRow}><Ionicons name="time-outline" size={20} color={Colors.textLight} /><Text style={styles.timeLabel}>On Time</Text><TextInput style={styles.timeInput} placeholder="HH:MM" keyboardType="numeric" maxLength={5} value={inputOnTime} onChangeText={(text) => handleTimeInputChange(text, setInputOnTime)} /></View>
                <View style={styles.timeInputRow}><Ionicons name="time-outline" size={20} color={Colors.textLight} /><Text style={styles.timeLabel}>Off Time</Text><TextInput style={styles.timeInput} placeholder="HH:MM" keyboardType="numeric" maxLength={5} value={inputOffTime} onChangeText={(text) => handleTimeInputChange(text, setInputOffTime)} /></View>
                <TouchableOpacity style={[styles.submitButton, isSubmitDisabled && styles.submitButtonDisabled]} onPress={handleSubmit} disabled={isSubmitDisabled}><Text style={styles.submitButtonText}>Save Schedule</Text></TouchableOpacity>
              </View>
              
              <View style={styles.savedScheduleContainer}>
                <Text style={styles.cardTitle}>Saved Schedules</Text>
                {schedules.map((item) => (
                  <View key={item.id} style={styles.scheduleCard}>
                    <View style={styles.scheduleInfo}>
                      <Text style={styles.scheduleDay}>{item.day}</Text>
                      <View style={styles.scheduleTimeContainer}>
                        <View style={styles.scheduleTimeRow}><View style={[styles.dot, { backgroundColor: Colors.greenDot }]} /><Text style={styles.scheduleTimeLabel}>On</Text><Text style={styles.scheduleTimeValue}>{item.onTime}</Text></View>
                        <View style={styles.scheduleTimeRow}><View style={[styles.dot, { backgroundColor: Colors.redDot }]} /><Text style={styles.scheduleTimeLabel}>Off</Text><Text style={styles.scheduleTimeValue}>{item.offTime}</Text></View>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}><Ionicons name="trash-outline" size={22} color={Colors.redDot} /></TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        <Modal animationType="fade" transparent={true} visible={isDayModalVisible} onRequestClose={() => setDayModalVisible(false)}>
          <Pressable style={styles.modalOverlay} onPress={() => setDayModalVisible(false)}>
            <View style={styles.modalContent}><Text style={styles.modalTitle}>Select a Day</Text><FlatList data={daysOfWeek} keyExtractor={(item) => item} renderItem={({ item }) => (<TouchableOpacity style={styles.dayItem} onPress={() => { setSelectedDay(item); setDayModalVisible(false); }}><Text style={styles.dayItemText}>{item}</Text></TouchableOpacity>)} /></View>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { paddingHorizontal: 20, paddingBottom: 40 },
  profileContainer: { alignItems: 'center', marginVertical: 20 },
  profileImage: { width: 110, height: 110, borderRadius: 55, borderWidth: 4, borderColor: Colors.white },
  addPictureButton: { position: 'absolute', bottom: 5, right: 5, backgroundColor: Colors.primary, borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Colors.white },
  profileName: { fontSize: 22, fontWeight: 'bold', color: Colors.text, marginTop: 12 },
  profileEmail: { fontSize: 15, color: Colors.textLight },
  editProfileButton: { marginTop: 15, backgroundColor: 'rgba(255,255,255,0.8)', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
  editProfileText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  modeControlContainer: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 25, padding: 5, marginBottom: 20 },
  modeButton: { flex: 1, paddingVertical: 10, borderRadius: 20 },
  modeButtonActive: { backgroundColor: Colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 },
  modeButtonText: { textAlign: 'center', fontSize: 16, color: Colors.textLight, fontWeight: '600' },
  modeButtonTextActive: { color: Colors.primary },
  card: { backgroundColor: Colors.white, borderRadius: 20, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text, marginBottom: 15 },
  pickerButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.background, borderRadius: 10, padding: 15, marginBottom: 15 },
  pickerButtonText: { flex: 1, textAlign: 'center', fontSize: 16, color: Colors.text, fontWeight: '500' },
  timeInputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, backgroundColor: Colors.background, borderRadius: 10, paddingHorizontal: 15 },
  timeLabel: { fontSize: 16, color: Colors.text, marginHorizontal: 10 },
  timeInput: { flex: 1, paddingVertical: 15, fontSize: 16, textAlign: 'right' },
  submitButton: { backgroundColor: Colors.primary, borderRadius: 15, paddingVertical: 15, alignItems: 'center', marginTop: 10 },
  submitButtonDisabled: { backgroundColor: '#CCCCCC' },
  submitButtonText: { fontSize: 16, fontWeight: 'bold', color: Colors.white },
  savedScheduleContainer: { marginTop: 10 },
  scheduleCard: { backgroundColor: Colors.white, borderRadius: 15, padding: 15, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  scheduleInfo: { flex: 1 },
  scheduleDay: { fontSize: 16, fontWeight: 'bold', color: Colors.primary, marginBottom: 8 },
  scheduleTimeContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  scheduleTimeRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  scheduleTimeLabel: { fontSize: 14, color: Colors.textLight, marginRight: 5 },
  scheduleTimeValue: { fontSize: 14, fontWeight: '600', color: Colors.text },
  deleteButton: { marginLeft: 15, padding: 5 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: Colors.white, borderRadius: 20, padding: 20, width: '80%', maxHeight: '60%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  dayItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: Colors.border },
  dayItemText: { textAlign: 'center', fontSize: 16, color: Colors.text },
  
  automaticCardContent: {
    alignItems: 'center',
    textAlign: 'center',
  },
  automaticCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 15,
    marginBottom: 10,
  },
  automaticCardText: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  goToControlBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  goToControlBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.white,
  },
});