import { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#0e7d8b',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Image
        source={require('../assets/logo.png')}
        onLoad={() => setLoaded(true)}
        style={{
          width: width < 400 ? 120 : 180,
          height: width < 400 ? 120 : 180,
          borderRadius: width < 400 ? 60 : 90,
          marginBottom: 20,
          opacity: loaded ? 1 : 0, // só mostra quando carregado
        }}
        resizeMode="contain"
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
