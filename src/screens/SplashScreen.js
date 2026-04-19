import { View, Text, Image, Dimensions } from 'react-native';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // ✅ rota correta
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0e7d8b',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Logo - confirmada em src/assets/logo.png */}
      <Image
        source={require('../assets/logo.png')} // ✅ caminho correto
        style={{
          width: width < 400 ? 100 : 150,
          height: width < 400 ? 100 : 150,
          borderRadius: width < 400 ? 50 : 75,
          marginBottom: 20,
        }}
        resizeMode="cover"
      />

      <Text
        style={{
          fontSize: width < 400 ? 18 : 26,
          fontWeight: 'bold',
          color: '#fff', // ✅ contraste melhor
          textAlign: 'center',
        }}
      >
        RAEL BARBEARIA
      </Text>
    </View>
  );
}
