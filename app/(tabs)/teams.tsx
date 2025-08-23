import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { SvgProps } from "react-native-svg";
import LogoD from "../../assets/images/D.svg";
import { Colors } from "../../constants/Colors";
import { TEAM_DATA } from "../../constants/team-data";

// Komponen kartu anggota (tidak ada perubahan fungsi)
const TeamMemberCard = ({
  code,
  name,
  major,
  ProfilePicComponent,
}: {
  code: string;
  name: string;
  major: string;
  ProfilePicComponent: React.FC<SvgProps>;
}) => (
  <View style={styles.memberCard}>
    <View style={styles.memberInfoBox}>
      <Text style={styles.memberCode}>{code}</Text>
      <Text style={styles.memberName} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.memberMajor} numberOfLines={1}>
        {major}
      </Text>
      <View style={styles.commentTail} />
    </View>
    <View style={styles.memberProfilePic}>
      <ProfilePicComponent width="100%" height="100%" />
    </View>
  </View>
);

export default function TeamsScreen() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* --- PERUBAHAN 1: Header sekarang berada di luar ScrollView agar tetap --- */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>RESEARCH DIVISION 2023</Text>
          <Text style={styles.headerSubtitle}>OUR TEAM</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {TEAM_DATA.map((group, index) => (
          <View key={index} style={styles.teamSection}>
            <Text style={styles.sectionTitle}>{group.role}</Text>
            <View style={styles.membersContainer}>
              {group.members.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  code={member.code}
                  name={member.name}
                  major={member.major}
                  ProfilePicComponent={LogoD} // Menggunakan LogoD sebagai placeholder
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: Colors.text,
  },
  headerSubtitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 24,
    color: Colors.text,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  contentContainer: {
    padding: 20,
  },
  teamSection: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Roboto-SemiBoldItalic",
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  // --- PERUBAHAN 2: Style untuk layout anggota tim ---
  membersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 11,
  },
  memberCard: {
    width: "48%", // Setiap kartu lebarnya 48% agar ada ruang di tengah
    alignItems: "center",
    marginBottom: 25,
  },
  memberInfoBox: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: "105%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
    position: "relative",
  },
  commentTail: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: Colors.white,
    position: "absolute",
    bottom: -10,
    alignSelf: "center",
  },
  memberCode: {
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    color: Colors.text,
    textAlign: "center",
  },
  memberName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    color: Colors.primary,
    textAlign: "center",
    marginTop: 2,
  },
  memberMajor: {
    fontFamily: "Poppins-Regular",
    fontSize: 9,
    color: Colors.textLight,
    textAlign: "center",
  },
  memberProfilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.secondary,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
});
