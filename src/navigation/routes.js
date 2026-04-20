import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ClienteScreen from '../screens/ClienteScreen';
import BarberScreen from '../screens/BarbeiroScreen';
import CadastroScreen from '../screens/CadastroScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import MaintenanceScreen from '../screens/MaintenanceScreen';
import ConfiguracaoScreen from '../screens/ConfiguracaoScreen';
import ConfirmacaoScreen from '../screens/ConfirmacaoScreen';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import CadastroBarbeiroScreen from '../screens/CadastroBarbeiroScreen';
const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cliente" component={ClienteScreen} />
      <Stack.Screen name="Barber" component={BarberScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="CadastroBarbeiro" component={CadastroBarbeiroScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
      <Stack.Screen name="Configuracao" component={ConfiguracaoScreen} />
      <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} />
    </Stack.Navigator>
  );
}
