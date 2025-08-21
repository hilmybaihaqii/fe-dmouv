import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { TEAM_DATA } from "../../constants/team-data";

// Component for a single team member card
const TeamMemberCard = ({
  code,
  name,
  major,
  profilePic,
}: {
  code: string;
  name: string;
  major: string;
  profilePic: any;
}) => (
  <View style={styles.memberCard}>
    <View style={styles.memberInfoBox}>
      <Text style={styles.memberCode}>{code}</Text>
      <Text style={styles.memberName}>{name}</Text>
      <Text style={styles.memberMajor}>{major}</Text>
    </View>
    <Image source={profilePic} style={styles.memberProfilePic} />
  </View>
);

export default function TeamsScreen() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* Custom Header without navigation icons */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>RESEARCH DIVISION 2023</Text>
          <Text style={styles.headerSubtitle}>Our Team</Text>
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
                  profilePic={member.profilePic}
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
  // Header Styles
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: Colors.text,
  },
  headerSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.textLight,
  },
  // Main Content Styles
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  teamSection: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 15,
    textAlign: "center",
  },
  membersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 15,
  },
  memberCard: {
    alignItems: "center",
    width: "45%",
    marginBottom: 15,
  },
  memberInfoBox: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 10,
    marginBottom: -10,
    zIndex: 1,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberCode: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: Colors.text,
    textAlign: "center",
  },
  memberName: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.textLight,
    textAlign: "center",
    marginTop: 2,
  },
  memberMajor: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.textLight,
    textAlign: "center",
  },
  memberProfilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.white,
    marginTop: 15,
  },
});
