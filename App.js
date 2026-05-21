import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 🚀 IMPORTAÇÃO DE TODAS AS TELAS DO SEU PROJETO (Confirmado com a estrutura de arquivos!)
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen'; 
import ClienteScreen from './src/screens/ClienteScreen';   
import BarbeiroScreen from './src/screens/BarbeiroScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import ConfiguracaoScreen from './src/screens/ConfiguracaoScreen';
import MaintenanceScreen from './src/screens/MaintenanceScreen';
import ConfirmacaoScreen from './src/screens/ConfirmacaoScreen';
import CadastroBarbeiroScreen from './src/screens/CadastroBarbeiroScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // ⏱️ Mantém a Splash Screen por 3 segundos na tela
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  // Se o timer ainda estiver ativo, exibe apenas a Splash limpa
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Esconde a barra de cabeçalho padrão feia do sistema
          cardStyle: { backgroundColor: '#000' } // Evita flashes brancos na transição de telas
        }}
      >
        {/* 🔐 Fluxo de Autenticação e Cadastro */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="CadastroBarbeiro" component={CadastroBarbeiroScreen} />

        {/* 💈 Fluxos Principais baseados nos Níveis de Acesso */}
        <Stack.Screen name="Cliente" component={ClienteScreen} />
        <Stack.Screen name="Barbeiro" component={BarbeiroScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* ⚙️ Utilitários, Confirmações e Telas de Suporte */}
        <Stack.Screen name="Configuracao" component={ConfiguracaoScreen} />
        <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} />
        <Stack.Screen name="Maintenance" component={MaintenanceScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}