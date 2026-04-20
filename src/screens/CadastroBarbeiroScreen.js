import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; // se quiser integrar com backend

const { width } = Dimensions.get('window');

export default function CadastroBarbeiro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const salvar = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      // Exemplo com backend (quando estiver rodando):
      // const response = await api.post('/barbeiro/cadastro', { email, senha });
      // if (response.status === 201) { ... }

      // Enquanto isso, salva localmente:
      const novoBarbeiro = {
        id: Date.now(), // gera ID único
        email,
        senha
      };

      await AsyncStorage.setItem('barbeiro', JSON.stringify(novoBarbeiro));
      Alert.alert('Sucesso', 'Barbeiro cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível cadastrar o barbeiro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro de Barbeiro</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
        style={styles.input}
      />

      <TouchableOpacity onPress={salvar} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0F172A' },
  header: { 
    color: '#fff', 
    fontSize: width < 400 ? 22 : 28, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#fff',
    paddingVertical: width < 400 ? 10 : 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: width < 400 ? 14 : 16
  },
  button: {
    backgroundColor: '#0A84FF',
    padding: width < 400 ? 12 : 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: width < 400 ? 14 : 16
  }
});
