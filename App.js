import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/Routes';

// Registro do Service Worker para PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(reg => {
        console.log("✅ Service Worker registrado com sucesso:", reg);
      })
      .catch(err => {
        console.error("❌ Falha ao registrar Service Worker:", err);
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
