import { View, Text, Image } from 'react-native';
import { useEffect } from 'react';

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
        backgroundColor: '#09aec4',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      {/* IMAGEM REDONDA */}
      <Image
        source={require('../../assets/images/logo.png')}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60, // 🔥 deixa redondo automático
          marginBottom: 20
        }}
        resizeMode="cover"
      />

      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: '#000',
        }}
      >
        RAEL Barber
      </Text>

    </View>
  );
}