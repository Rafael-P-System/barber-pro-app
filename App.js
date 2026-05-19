import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen'; // 🚀 Importa sua Splash
import LoginScreen from './src/screens/LoginScreen';   // 🔑 Importa seu Login

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // ⏱️ Define um tempo de 3 segundos para mostrar a Splash Screen
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); 

    return () => clearTimeout(timer); // Limpa o timer ao desmontar
  }, []);

  return (
    <NavigationContainer>
      {showSplash ? <SplashScreen /> : <LoginScreen />}
    </NavigationContainer>
  );
}