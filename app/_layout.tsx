import { Stack } from 'expo-router';
import { useCachedResources } from '@/hooks/useCachedResources';
import { View, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { LampProvider } from '@/context/LampContext'; //

const Header = ({ options, navigation, route }: NativeStackHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { title } = options;

  const isAccountSettings = route.name === 'account-settings';
  const isTransparentWithBlueIcons = route.name === 'lamp-control' || route.name === 'notifications';

  let iconColor;
  let backgroundColor;
  let titleColor;

  if (isAccountSettings) {
    iconColor = Colors.white;
    titleColor = Colors.white;
    backgroundColor = 'transparent';
  } else if (isTransparentWithBlueIcons) {
    iconColor = Colors.primary;
    titleColor = Colors.white;
    backgroundColor = 'transparent';
  } else {
    iconColor = Colors.primary;
    titleColor = Colors.text;
    backgroundColor = Colors.background;
  }

  return (
    <View style={[
      headerStyles.headerContainer,
      { 
        paddingTop: insets.top,
        backgroundColor: backgroundColor,
      }
    ]}>
      <View style={headerStyles.leftContainer}>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
      <View style={headerStyles.centerContainer}>
        {title && <Text style={[headerStyles.headerTitleText, { color: titleColor }]}>{title}</Text>}
      </View>
      <View style={headerStyles.rightContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('notifications' as never)}>
          <Ionicons name="notifications-outline" size={30} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => navigation.navigate('account-settings' as never)}>
          <Ionicons name="person-circle-outline" size={30} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  leftContainer: { flex: 1, alignItems: 'flex-start' },
  centerContainer: { flex: 2, alignItems: 'center', justifyContent: 'center' },
  rightContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  headerTitleText: { fontFamily: 'Poppins-Bold', fontSize: 18 },
});

export default function RootLayout() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  
  return (
    // 2. Bungkus seluruh aplikasi dengan LampProvider
    <LampProvider>
      <StatusBar barStyle="light-content" />
      <Stack
        screenOptions={{
          header: ({ options, navigation, route }) => (
            <Header options={options} navigation={navigation} route={route} />
          ),
          headerShown: true,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="account-settings" options={{ title: '' }} />
        <Stack.Screen name="lamp-control" options={{ title: '' }} />
        <Stack.Screen name="notifications" options={{ title: '' }} />
      </Stack>
    </LampProvider>
  );
}
