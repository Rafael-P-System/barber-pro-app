import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native';

// Import das telas
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import ClienteScreen from '../screens/ClienteScreen';
import BarberScreen from '../screens/BarberScreen';
import ConfirmacaoScreen from '../screens/ConfirmacaoScreen';
import ConfiguracaoScreen from '../screens/ConfiguracaoScreen';
import SplashScreen from '../screens/SplashScreen';
import MaintenanceScreen from '../screens/MaintenanceScreen';
import CadastroBarbeiro from '../screens/CadastroBarbeiro';

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Cadastro" 
        component={CadastroScreen} 
        options={{ 
          title: width < 400 ? 'Cadastro' : 'Crie sua conta',
          headerTitleStyle: { fontSize: width < 400 ? 16 : 20 }
        }} 
      />
      <Stack.Screen 
        name="CadastroBarbeiro" 
        component={CadastroBarbeiro} 
        options={{ title: 'Cadastro Barbeiro' }} 
      />
      <Stack.Screen 
        name="Cliente" 
        component={ClienteScreen} 
        options={{ title: 'Área do Cliente' }} 
      />
      <Stack.Screen 
        name="Barber" 
        component={BarberScreen} 
        options={{ 
          title: 'Painel do Barbeiro', 
          headerBackVisible: false 
        }} 
      />
      <Stack.Screen 
        name="Confirmacao" 
        component={ConfirmacaoScreen} 
        options={{ title: 'Confirmação' }} 
      />
      <Stack.Screen 
        name="Configuracao" 
        component={ConfiguracaoScreen} 
        options={{ title: 'Configurações' }} 
      />
      <Stack.Screen 
        name="Maintenance" 
        component={MaintenanceScreen} 
        options={{ title: 'Manutenção' }} 
      />
    </Stack.Navigator>
  );
}
