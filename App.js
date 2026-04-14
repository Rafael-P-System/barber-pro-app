import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import CadastroBarbeiro from './src/screens/CadastroBarbeiro';
import ClienteScreen from './src/screens/ClienteScreen';
import HomeScreen from './src/screens/HomeScreen';
import ConfirmacaoScreen from './src/screens/ConfirmacaoScreen';
import BarberScreen from './src/screens/BarberScreen';

// Ajuste dos caminhos
import AdminDashboard from './src/screens/AdminDashboard';
import MaintenanceScreen from './src/screens/MaintenanceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        
        {/* Telas Iniciais */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="CadastroBarbeiro" component={CadastroBarbeiro} />

        {/* Visão do Cliente */}
        <Stack.Screen name="Cliente" component={ClienteScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} />

        {/* Visão do Barbeiro */}
        <Stack.Screen name="Barber" component={BarberScreen} />

        {/* Gestão do Negócio */}
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="Maintenance" component={MaintenanceScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
