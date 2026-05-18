import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// 🧭 Importando a LoginScreen direto da pasta correta que vimos no seu print
import LoginScreen from './src/screens/LoginScreen'; 

export default function App() {
  return (
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  );
}