import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importação das Telas do Ecossistema Barber Pro
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import CadastroBarbeiroScreen from '../screens/CadastroBarbeiroScreen';
import ClienteScreen from '../screens/ClienteScreen';
import HomeScreen from '../screens/HomeScreen';
import ConfirmacaoScreen from '../screens/ConfirmacaoScreen';
import BarbeiroScreen from '../screens/BarbeiroScreen'; // 🔥 Alinhado com o padrão de nome de arquivo
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import MaintenanceScreen from '../screens/MaintenanceScreen';
import ConfiguracaoScreen from '../screens/ConfiguracaoScreen';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator 
      initialRouteName="Splash" // Garante que o app sempre comece pela Splash
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="CadastroBarbeiro" component={CadastroBarbeiroScreen} />
      <Stack.Screen name="Cliente" component={ClienteScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} />
      <Stack.Screen name="Barbeiro" component={BarbeiroScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
      <Stack.Screen name="Configuracao" component={ConfiguracaoScreen} />
    </Stack.Navigator>
  );
}