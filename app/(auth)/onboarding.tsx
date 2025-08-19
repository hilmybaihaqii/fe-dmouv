import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import OnboardingData from '@/constants/OnboardingData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const OnboardingItem = ({ item }: { item: typeof OnboardingData[0] }) => {
  return (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      {/* Warna title sekarang hitam dengan shadow */}
      <Text style={styles.title}>{item.title}</Text>
      {/* Warna subtitle sekarang biru tua */}
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};

const Paginator = ({ data, scrollX }: { data: any[], scrollX: Animated.Value }) => {
  // Bagi posisi scroll dengan lebar layar untuk mendapatkan indeks
  const dotPosition = Animated.divide(scrollX, width);

  return (
    <View style={styles.paginatorContainer}>
      {data.slice(0, 3).map((_, i) => {
        // Interpolasi untuk mengubah lebar titik
        const dotWidth = dotPosition.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [10, 20, 10],
          extrapolate: 'clamp', // Batasi nilai output agar tidak melebihi batas
        });

        // Interpolasi untuk mengubah opasitas titik
        const dotOpacity = dotPosition.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        // Interpolasi untuk mengubah warna titik
        const dotColor = dotPosition.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: ['#ccc', Colors.primary, '#ccc'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i.toString()}
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity: dotOpacity,
                backgroundColor: dotColor,
              }
            ]}
          />
        );
      })}
    </View>
  );
};

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);
  const router = useRouter();

  // Buat Animated.Value untuk melacak posisi scroll
  const scrollX = useRef(new Animated.Value(0)).current;

  // Gunakan onViewableItemsChanged untuk melacak indeks saat ini
  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Hubungkan FlatList onScroll dengan Animated.event
  const handleOnScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const scrollTo = (index: number) => {
    if (slidesRef.current && index >= 0 && index < OnboardingData.length) {
      slidesRef.current.scrollToIndex({ index });
    }
  };

  const navigateToNextScreen = async () => {
    try {
      await AsyncStorage.setItem('onboardingComplete', 'true');
      router.push('/(auth)/ip-device');
    } catch (e) {
      console.error("Failed to save onboarding status.", e);
    }
  };

  const handleNext = () => {
    if (currentIndex < OnboardingData.length - 1) {
      scrollTo(currentIndex + 1);
    } else {
      navigateToNextScreen();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      scrollTo(currentIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Blobs */}
      <View style={[styles.blob, styles.blob1]} />
      <View style={[styles.blob, styles.blob2]} />
      <View style={[styles.blob, styles.blob3]} />

      {/* Konten Utama (Gambar & Teks) */}
      <View style={styles.mainContent}>
        <FlatList
          ref={slidesRef}
          data={OnboardingData}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          // Tambahkan onScroll dan scrollEventThrottle
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />
      </View>

      {/* Footer (Tombol & Paginator) */}
      <View style={styles.footer}>
        {currentIndex === OnboardingData.length - 1 ? (
          <TouchableOpacity style={styles.buttonGetStarted} onPress={handleNext}>
            <Text style={styles.buttonTextGetStarted}>{"Let's Get Started"}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.navigationContainer}>
            {/* Tombol Back/Skip dalam kotak */}
            {currentIndex === 0 ? (
              <TouchableOpacity style={styles.skipBackButton} onPress={navigateToNextScreen}>
                <Text style={styles.buttonTextSkip}>Skip</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.skipBackButton} onPress={handleBack}>
                <Text style={styles.buttonTextSkip}>Back</Text>
              </TouchableOpacity>
            )}

            {/* Kirim scrollX ke komponen Paginator */}
            <Paginator data={OnboardingData} scrollX={scrollX} />

            {/* Tombol Next dalam kotak */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.buttonTextNext}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  blob: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(159, 201, 255, 0.3)',
  },
  blob1: { top: -80, left: -100 },
  blob2: { top: '30%', right: -90 },
  blob3: { bottom: -60, left: '45%' },

  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 100,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
    marginBottom: 20, 
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // Warna bayangan yang sedikit lebih gelap
    textShadowOffset: { width: 1.5, height: 1.5 }, // Posisi offset bayangan
    textShadowRadius: 2, 
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: Colors.primary, // Warna teks subtitle menjadi biru tua
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  skipBackButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    // Menambahkan shadow pada tombol
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paginatorContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  buttonTextSkip: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  buttonTextNext: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  buttonGetStarted: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    // Menambahkan shadow pada tombol Get Started
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextGetStarted: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
});
