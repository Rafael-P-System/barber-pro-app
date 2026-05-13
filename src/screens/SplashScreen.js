import { useEffect, useState, useRef } from 'react';
import { View, Text, Animated, Dimensions, Easing, Platform } from 'react-native';

const { width } = Dimensions.get('window');

// Detecta se é web para evitar o erro do useNativeDriver
const isWeb = Platform.OS === 'web';

export default function SplashScreen({ navigation }) {
  const [loaded, setLoaded] = useState(false);
  
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de flutuar
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: !isWeb, // Ajuste aqui
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: !isWeb, // Ajuste aqui
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation, floatAnim]);

  useEffect(() => {
    if (loaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: !isWeb, // Ajuste aqui
      }).start();
    }
  }, [loaded, fadeAnim]);

  const logoSize = width < 400 ? 120 : 180;
  const logoRadius = logoSize / 2;

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#0e7d8b',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Animated.Image
        source={require('../assets/logo.png')}
        onLoad={() => setLoaded(true)}
        style={{
          width: logoSize,
          height: logoSize,
          borderRadius: logoRadius,
          marginBottom: 20,
          opacity: fadeAnim,
          transform: [{ translateY: floatAnim }],
          backgroundColor: '#fff',
        }}
        resizeMode="cover"
      />
      
      <Text style={{
        fontSize: width < 400 ? 20 : 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
      }}>
        RAEL BARBEARIA
      </Text>
    </View>
  );
}