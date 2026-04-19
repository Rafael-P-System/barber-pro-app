import { View, Text, Image, Dimensions } from 'react-native';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
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
      <Image
        source={require('../assets/logo.png')}
        style={{
          width: width < 400 ? 100 : 150,   // menor em telas pequenas, maior em desktop
          height: width < 400 ? 100 : 150,
          borderRadius: width < 400 ? 50 : 75,
          marginBottom: 20,
        }}
        resizeMode="cover"
      />

      <Text
        style={{
          fontSize: width < 400 ? 18 : 26, // ajusta fonte conforme tela
          fontWeight: 'bold',
          color: '#000',
          textAlign: 'center',
        }}
      >
        RAEL BARBEARIA
      </Text>
    </View>
  );
}
