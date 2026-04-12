import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroBarbeiro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const salvar = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha tudo');
      return;
    }

    await AsyncStorage.setItem('barbeiro', JSON.stringify({ email, senha }));
    Alert.alert('Sucesso', 'Barbeiro cadastrado');
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0F172A' }}>
      <TextInput placeholder="Email" onChangeText={setEmail} style={{ backgroundColor: '#fff', marginBottom: 10, padding: 10 }} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={setSenha} style={{ backgroundColor: '#fff', marginBottom: 10, padding: 10 }} />

      <TouchableOpacity onPress={salvar}>
        <Text style={{ color: '#0A84FF', textAlign: 'center' }}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}