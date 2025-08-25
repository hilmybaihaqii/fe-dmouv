import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, Text } from "react-native";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      router.replace('/(auth)/login');
    } catch (e) {
      console.error("Gagal melakukan logout.", e);
    }
  };

  return (
    <Pressable onPress={handleLogout}>
      <Text>Logout</Text>
    </Pressable>
  );

};

export default LogoutButton;