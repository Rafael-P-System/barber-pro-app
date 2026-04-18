import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const realizarLogin = async (tipo) => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      // 1. Rota dinâmica baseada no botão clicado
      const endpoint = tipo === 'cliente' ? '/cliente/login' : '/barbeiro/login';
      const response = await api.post(endpoint, { email, senha });

      if (response.status === 200) {
        const usuario = response.data;

        // ✅ SALVAMENTO GLOBAL: Guarda o ID e Nome para usar nos agendamentos depois
        await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        // 2. LÓGICA DE STATUS (Para o seu modelo de negócio SaaS)
        if (usuario.status === 'SUSPENSO') {
          navigation.replace('MaintenanceScreen'); 
          return;
        }

        // 3. SEPARAÇÃO DE ACESSOS (Batendo com as colunas do seu MySQL)
        // Usamos 'nivel' para barbeiro/admin e 'tipo' para cliente
        if (usuario.nivel === 'ADM') {
          Alert.alert("Bem-vindo,Rafael!", "Painel de Gestão liberado.");
          navigation.replace('AdminDashboard'); 
        } 
        else if (tipo === 'barbeiro') {
          navigation.replace('BarberScreen');
        } 
        else {
          navigation.replace('ClienteScreen');
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
      } else {
        Alert.alert("Erro", "Servidor fora do ar. Verifique se o Java está rodando.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja Bem vindo!</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#94A3B8"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        onPress={() => realizarLogin('cliente')} 
        style={styles.buttonCliente}
      >
        <Text style={styles.buttonText}>Sou Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => realizarLogin('barbeiro')} 
        style={styles.buttonBarbeiro}
      >
        <Text style={styles.buttonText}>Sou Barbeiro / Admin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#03060e', 
    justifyContent: 'center', 
    padding: 20 
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155',
    fontSize: 16
  },
  buttonCliente: { 
    backgroundColor: '#0a44a0', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12,
    elevation: 3
  },
  buttonBarbeiro: { 
    backgroundColor: '#15977d', 
    padding: 16, 
    borderRadius: 12,
    elevation: 3
  },
  buttonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16
  }
});