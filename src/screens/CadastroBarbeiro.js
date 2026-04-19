import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';              // para salvar barbeiro

const { width } = Dimensions.get('window');

export default function CadastroBarbeiro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const salvar = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha tudo');
      return;
    }

    const novoBarbeiro = {
      id: Date.now(), // 🔑 gera ID único
      email,
      senha
    };

    await AsyncStorage.setItem('barbeiro', JSON.stringify(novoBarbeiro));
    Alert.alert('Sucesso', 'Barbeiro cadastrado');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setSenha}
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
