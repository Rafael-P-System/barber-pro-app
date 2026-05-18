import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//  Caminho corrigido para a sua pasta real de rotas
import Routes from './src/routes'; 

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}