// file: app/components/CustomSwitch.tsx
import React, { useRef, useEffect } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Definisikan ulang Colors di sini atau impor dari file konstanta Anda
const Colors = {
  primary: '#0044cc',
  background: '#f0f2f5',
  white: '#ffffff',
  border: '#d9d9d9',
  textLight: '#888',
};

interface CustomSwitchProps {
  value: boolean;
  onValueChange: () => void;
  disabled?: boolean;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ value, onValueChange, disabled = false }) => {
  // Animated value, 0 for off, 1 for on
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 250, // Durasi animasi dalam milidetik
      useNativeDriver: false, // Kita akan menganimasikan warna dan posisi
    }).start();
  }, [value, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 42], // Posisi thumb dari kiri
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.border, Colors.primary], // Warna latar dari abu-abu ke biru
  });

  const animatedContainerStyle = {
    backgroundColor,
  };

  const animatedThumbStyle = {
    transform: [{ translateX }],
  };

  return (
    <Pressable onPress={onValueChange} disabled={disabled}>
      <Animated.View style={[styles.container, animatedContainerStyle, disabled && styles.disabled]}>
        <Animated.View style={[styles.thumb, animatedThumbStyle]}>
           <Ionicons 
            name={value ? 'sunny' : 'moon'} 
            size={18} 
            color={value ? Colors.primary : Colors.textLight} 
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomSwitch;