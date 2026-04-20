import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import api from '../services/api';

const { width } = Dimensions.get('window');

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const salvarCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    try {
      const response = await api.post('/cliente/cadastro', { nome, email, senha });
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.replace('Login');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro. Verifique sua conexão ou tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro de Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#94A3B8"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#94A3B8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={salvarCadastro}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      {/* Botão para voltar ao login sem cadastrar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace('Login')}>
        <Text style={styles.backButtonText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  header: { 
    color: '#fff', 
    fontSize: width < 400 ? 22 : 28, 
    fontWeight: 'bold', 
    marginTop: 40, 
    marginBottom: 30, 
    textAlign: 'center' 
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#fff',
    paddingVertical: width < 400 ? 10 : 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: width < 400 ? 14 : 16,
    borderWidth: 1,
    borderColor: '#334155'
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
  },
  backButton: {
    marginTop: 15,
    padding: 10,
    alignSelf: 'center'
  },
  backButtonText: {
    color: '#0A84FF',
    fontSize: width < 400 ? 13 : 15,
    fontWeight: '600'
  }
});
