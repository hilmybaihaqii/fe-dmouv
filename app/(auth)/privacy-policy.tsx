import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>{"Privacy & Policy"}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Konten Kebijakan Privasi */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.updateText}>{"Last updated: August 17, 2025"}</Text>

        <Text style={styles.sectionTitle}>{"1. Introduction"}</Text>
        <Text style={styles.paragraph}>
          {
            'Welcome to D\'mouv ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.'
          }
        </Text>

        <Text style={styles.sectionTitle}>{"2. Information We Collect"}</Text>
        <Text style={styles.paragraph}>
          {
            "The personal information that we collect depends on the context of your interactions with us and the application, the choices you make, and the products and features you use. The personal information we collect may include the following:"
          }
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            {
              "\u2022 Name and Contact Data: We collect your name and email address."
            }
          </Text>
          <Text style={styles.listItem}>
            {
              "\u2022 Credentials: We collect passwords used for authentication and account access."
            }
          </Text>
          <Text style={styles.listItem}>
            {
              "\u2022 Device and Connection Data: We collect your device's IP address and the SSID of the Wi-Fi network you connect."
            }
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          {"3. How We Use Your Information"}
        </Text>
        <Text style={styles.paragraph}>
          {
            "We use the information we collect or receive for the following purposes:"
          }
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            {"\u2022 To facilitate account creation and the logon process."}
          </Text>
          <Text style={styles.listItem}>
            {"\u2022 To manage user accounts and keep them in working order."}
          </Text>
          <Text style={styles.listItem}>
            {
              "\u2022 To provide the core service of motion detection. This may require access to your device's camera feed, which is processed for motion and not stored unless motion is detected."
            }
          </Text>
          <Text style={styles.listItem}>
            {
              "\u2022 To send you administrative information, such as updates to our terms, conditions, and policies."
            }
          </Text>
        </View>

        <Text style={styles.sectionTitle}>{"4. Sharing Your Information"}</Text>
        <Text style={styles.paragraph}>
          {
            "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not sell your personal information to third parties."
          }
        </Text>

        <Text style={styles.sectionTitle}>{"5. Data Security"}</Text>
        <Text style={styles.paragraph}>
          {
            "We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the Internet can be guaranteed to be 100% secure."
          }
        </Text>

        <Text style={styles.sectionTitle}>{"6. Changes to This Policy"}</Text>
        <Text style={styles.paragraph}>
          {
            'We may update this privacy notice from time to time. The updated version will be indicated by an updated "Last updated" date.'
          }
        </Text>

        <Text style={styles.sectionTitle}>{"7. Contact Us"}</Text>
        <Text style={styles.paragraph}>
          {
            "If you have questions or comments about this notice, you may email us at support@dmouv.com."
          }
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border, // Menggunakan konstanta warna
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: Colors.primary,
  },
  headerSpacer: {
    width: 24, // Spacer untuk menyeimbangkan layout
  },

  // Content & Text Styles
  contentContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  updateText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 20,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: Colors.text,
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: Colors.textLight,
    lineHeight: 26,
    textAlign: "justify",
    marginBottom: 10,
  },
  list: {
    marginLeft: 10,
  },
  listItem: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: Colors.textLight,
    lineHeight: 26,
    marginBottom: 5,
    textAlign: "justify",
  },
});
