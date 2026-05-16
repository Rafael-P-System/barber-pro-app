import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/Routes';

// 🔥 CORREÇÃO: Executa o Service Worker APENAS se estiver rodando no Navegador (Web)
if (Platform.OS === 'web' && typeof window !== 'undefined' && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(reg => {
        console.log("✅ PWA: Service Worker registrado com sucesso:", reg);
      })
      .catch(err => {
        console.error("❌ PWA: Falha ao registrar Service Worker:", err);
      });
  });
}

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}