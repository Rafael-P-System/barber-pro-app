import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; // Certifique-se que o caminho está correto

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const realizarLogin = async (tipo) => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      // 1. Enviamos para a rota de login no Java
      const endpoint = tipo === 'cliente' ? '/cliente/login' : '/barbeiro/login';
      const response = await api.post(endpoint, { email, senha });

      if (response.status === 200) {
        const usuario = response.data;

        // 2. LÓGICA DE ANALISTA: Verificação de Status e Perfil
        if (usuario.status === 'SUSPENSO') {
          // Se o barbeiro não pagou, manda para a tela de "Disfarce"
          navigation.replace('Maintenance'); 
          return;
        }

        // 3. SEPARAÇÃO DE ACESSOS
        if (usuario.perfil === 'ADMIN') {
          // Se for VOCÊ (rafa08622@gmail.com)
          Alert.alert("Bem-vindo, Rafael!", "Painel de Gestão liberado.");
          await AsyncStorage.setItem('adminLogado', JSON.stringify(usuario));
          navigation.replace('AdminDashboard'); 
        } 
        else if (tipo === 'barbeiro') {
          // Se for um Barbeiro ativo
          await AsyncStorage.setItem('barbeiroLogado', JSON.stringify(usuario));
          navigation.replace('Barber');
        } 
        else {
          // Se for um Cliente
          await AsyncStorage.setItem('clienteLogado', JSON.stringify(usuario));
          navigation.replace('Cliente');
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "E-mail ou senha incorretos ou servidor fora do ar.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', padding: 20 }}>
      {/* Seus Inputs de Email e Senha aqui */}

      <TouchableOpacity
        onPress={() => realizarLogin('cliente')} 
        style={{ backgroundColor: '#0A84FF', padding: 15, borderRadius: 8, marginBottom: 10 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Entrar como Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => realizarLogin('barbeiro')} 
        style={{ backgroundColor: '#10B981', padding: 15, borderRadius: 8 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Entrar como Barbeiro / Admin</Text>
      </TouchableOpacity>
    </View>
  );
}