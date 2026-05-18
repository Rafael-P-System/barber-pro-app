import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Platform } from 'react-native';

export default function SplashScreen({ navigation }) {
  const animacaoFlutuar = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Loop infinito da animação de flutuar
    Animated.loop(
      Animated.sequence([
        Animated.timing(animacaoFlutuar, {
          toValue: -15, 
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(animacaoFlutuar, {
          toValue: 0, 
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Redirecionamento seguro após 3.5 segundos
    const timer = setTimeout(() => {
      if (navigation && typeof navigation.navigate === 'function') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [animacaoFlutuar, navigation]);

  return (
    <View style={styles.containerTelaToda}>
      <View style={styles.conteudoCentral}>
        
        {/* Container da Imagem com o efeito de flutuar */}
        <Animated.View style={[
          styles.containerImagem, 
          { transform: [{ translateY: animacaoFlutuar }] }
        ]}>
          <Animated.Image
            source={require('../assets/logo.png')} 
            style={styles.logoRedonda}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Texto do seu ecossistema */}
        <Text style={styles.tituloBarbearia}>Naldo BARBEARIA</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTelaToda: {
    flex: 1,
    width: '100%',
    // O segredo para a Web: força ocupar 100% da altura visível da página dinamicamente
    ...Platform.select({
      web: {
        height: '100vh',
        minHeight: '100vh',
      },
      default: {
        flex: 1,
      }
    }),
    backgroundColor: '#117986', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  conteudoCentral: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImagem: {
    width: 160,
    height: 160,
    borderRadius: 80, 
    backgroundColor: '#050c12', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoRedonda: {
    width: 154,
    height: 154,
    borderRadius: 77, 
  },
  tituloBarbearia: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    textAlign: 'center',
    marginTop: 10,
  },
});