import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // 🔵 LOGIN CLIENTE (AGORA VALIDANDO)
  const loginCliente = async () => {
    const data = await AsyncStorage.getItem('cliente');

    if (!data) {
      Alert.alert('Erro', 'Nenhum cliente cadastrado');
      return;
    }

    const cliente = JSON.parse(data);

    if (email === cliente.email && senha === cliente.senha) {
      navigation.replace('Cliente', { nome: cliente.nome });
    } else {
      Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  // 🆕 CADASTRO CLIENTE
  const cadastrarCliente = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    const novoCliente = {
      nome: email.split('@')[0],
      email,
      senha
    };

    await AsyncStorage.setItem('cliente', JSON.stringify(novoCliente));

    Alert.alert('Sucesso', 'Cliente cadastrado!');
  };

  // ❌ EXCLUIR CONTA CLIENTE
  const excluirConta = async () => {
    Alert.alert(
      'Atenção',
      'Deseja excluir sua conta?',
      [
        { text: 'Cancelar' },
        {
          text: 'Excluir',
          onPress: async () => {
            const data = await AsyncStorage.getItem('cliente');

            if (!data) return;

            const cliente = JSON.parse(data);

            // remove cliente
            await AsyncStorage.removeItem('cliente');

            // remove agendamentos do cliente
            const agData = await AsyncStorage.getItem('agendamentos');
            if (agData) {
              let lista = JSON.parse(agData);
              lista = lista.filter(item => item.nome !== cliente.nome);
              await AsyncStorage.setItem('agendamentos', JSON.stringify(lista));
            }

            Alert.alert('Conta removida');
          }
        }
      ]
    );
  };

  // 💈 LOGIN BARBEIRO (mantido)
  const loginBarbeiro = async () => {
    const data = await AsyncStorage.getItem('barbeiro');

    if (!data) {
      Alert.alert('Erro', 'Nenhum barbeiro cadastrado');
      return;
    }

    const barbeiro = JSON.parse(data);

    if (email === barbeiro.email && senha === barbeiro.senha) {
      navigation.replace('Barber');
    } else {
      Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', padding: 20 }}>

      <Image
        source={require('../assets/logo.png')}
        style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 20 }}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        style={{ backgroundColor: '#1E293B', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={{ backgroundColor: '#1E293B', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 20 }}
      />

      {/* LOGIN CLIENTE */}
      <TouchableOpacity
        onPress={loginCliente}
        style={{ backgroundColor: '#0A84FF', padding: 15, borderRadius: 8 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Entrar como Cliente
        </Text>
      </TouchableOpacity>

      {/* CADASTRO CLIENTE */}
      <TouchableOpacity
        onPress={cadastrarCliente}
        style={{ backgroundColor: '#22c55e', padding: 15, borderRadius: 8, marginTop: 10 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Cadastrar Cliente
        </Text>
      </TouchableOpacity>

      {/* EXCLUIR CONTA */}
      <TouchableOpacity
        onPress={excluirConta}
        style={{ backgroundColor: '#ef4444', padding: 12, borderRadius: 8, marginTop: 10 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          Excluir Conta
        </Text>
      </TouchableOpacity>

      {/* BARBEIRO */}
      <TouchableOpacity
        onPress={loginBarbeiro}
        style={{ backgroundColor: '#111', padding: 15, borderRadius: 8, marginTop: 10 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Entrar como Barbeiro
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('CadastroBarbeiro')}
        style={{ marginTop: 15 }}
      >
        <Text style={{ color: '#aaa', textAlign: 'center' }}>
          Cadastrar Barbeiro
        </Text>
      </TouchableOpacity>

    </View>
  );
}