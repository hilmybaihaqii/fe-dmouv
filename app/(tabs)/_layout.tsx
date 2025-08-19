import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import CustomTabBar from '@/components/navigation/CustomTabBar';
import { Image, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LampProvider } from '@/context/LampContext'; // <-- Impor Provider

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    // Bungkus semua tab dengan LampProvider
    <LampProvider>
      <Tabs
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: true,
          header: ({ options, navigation }) => {
            const state = navigation.getState();
            const isHome = state.routes[state.index]?.name === 'home';
            
            return (
              <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <View style={styles.leftContainer}>
                  {isHome ? (
                    <TouchableOpacity onPress={() => navigation.navigate('home')}>
                      <Image 
                        source={require('../../assets/images/D.png')}
                        style={styles.headerLogo}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('home')}>
                      <Ionicons name="arrow-back" size={30} color={Colors.primary} />
                    </TouchableOpacity>
                  )}
                </View>
                
                <View style={styles.centerContainer}>
                  {options.title && <Text style={styles.headerTitleText}>{options.title}</Text>}
                </View>

                <View style={styles.rightContainer}>
                  <TouchableOpacity onPress={() => navigation.navigate('notifications' as never)}>
                    <Ionicons name="notifications-outline" size={30} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => navigation.navigate('account-settings' as never)}>
                    <Ionicons name="person-circle-outline" size={30} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
        }}
      >
        <Tabs.Screen name="home" options={{ title: '' }} />
        <Tabs.Screen name="history" options={{ title: '' }} />
        <Tabs.Screen name="teams" options={{ title: '' }} />
        <Tabs.Screen name="settings" options={{ title: '' }} />
      </Tabs>
    </LampProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 10, backgroundColor: Colors.background },
  leftContainer: { flex: 1, alignItems: 'flex-start' },
  centerContainer: { flex: 2, alignItems: 'center', justifyContent: 'center' },
  rightContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  headerLogo: { width: 35, height: 35, resizeMode: 'contain' },
  headerTitleText: { fontFamily: 'Poppins-Bold', fontSize: 18, color: Colors.text },
});
