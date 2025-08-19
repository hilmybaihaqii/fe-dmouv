import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../constants/Colors';

export default function SplashScreenComponent() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.tagline}>
        LightsUpWhenLifeMoves
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  logo: {
    width: 220,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: Colors.primary,
  },
});
