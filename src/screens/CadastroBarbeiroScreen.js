import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import api from '../services/api'; // Certifique-se de que o caminho do seu arquivo api.js esteja correto

export default function CadastroBarbeiro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      // Esta rota agora corresponde ao método POST que colocamos no AdminController
      const response = await api.post('/admin/cadastrar-barbeiro', {
        nome: nome,
        email: email,
        senha: senha
      });

      if (response.status === 200) {
        Alert.alert("Sucesso", "Barbeiro cadastrado com sucesso!");
        navigation.goBack(); // Volta para a tela anterior
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível cadastrar o barbeiro. Verifique o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Barbeiro</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Nome do Barbeiro" 
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        placeholderTextColor="#999"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao} onPress={handleCadastro} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.textoBotao}>Cadastrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#000' },
  titulo: { color: '#FFD700', fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: '#1E293B', color: '#FFF', padding: 15, borderRadius: 10, marginBottom: 15 },
  botao: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, alignItems: 'center' },
  textoBotao: { fontWeight: 'bold', fontSize: 16 }
});