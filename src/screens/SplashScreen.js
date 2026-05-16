import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions, Easing, Platform, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function SplashScreen({ navigation }) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Float Animation (Infinite Loop) - Starts instantly
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15, // Smooth floating upwards
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: !isWeb,
        }),
        Animated.timing(floatAnim, {
          toValue: 0, // Returns to original position
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: !isWeb,
        }),
      ])
    ).start();

    // 2. Redirect to Login after 4 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation, floatAnim]);

  // Responsiveness
  const logoSize = width < 400 ? 120 : 180;
  const logoRadius = logoSize / 2;

  return (
    <View style={styles.container}>
      
      {/* 🚀 FIXED: Fade-in animation removed. The image renders instantly along with the screen. */}
      <Animated.Image
        source={require('../assets/logo.png')}
        style={[
          styles.logo,
          {
            width: logoSize,
            height: logoSize,
            borderRadius: logoRadius,
            transform: [{ translateY: floatAnim }], // Only movement is applied
          }
        ]}
        resizeMode="cover"
      />
      
      <Text style={[styles.title, { fontSize: width < 400 ? 20 : 28 }]}>
        RAEL BARBEARIA
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e7d8b', // Brand teal color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 20,
    backgroundColor: '#fff', // White background behind the logo circle
    opacity: 1, // Fixed at 1, ensuring instant visibility
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  }
});