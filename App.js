import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas (src/screens)
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import CadastroBarbeiro from './src/screens/CadastroBarbeiro';
import ClienteScreen from './src/screens/ClienteScreen';
import HomeScreen from './src/screens/HomeScreen';
import ConfirmacaoScreen from './src/screens/ConfirmacaoScreen';
import BarberScreen from './src/screens/BarberScreen';
import AdminDashboard from './src/screens/AdminDashboard';
import MaintenanceScreen from './src/screens/MaintenanceScreen';
import ConfiguracaoScreen from './src/screens/ConfiguracaoScreen'; // ✅ agora incluída

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash" 
        screenOptions={{ headerShown: false }}
      >
        {/* Telas Iniciais */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="CadastroBarbeiro" component={CadastroBarbeiro} />

        {/* Cliente */}
        <Stack.Screen name="Cliente" component={ClienteScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} />

        {/* Barbeiro */}
        <Stack.Screen name="Barber" component={BarberScreen} />

        {/* Administração */}
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="Maintenance" component={MaintenanceScreen} />

        {/* Configuração separada */}
        <Stack.Screen name="Configuracao" component={ConfiguracaoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
