import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Dimensions, 
  Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function CadastroBarbeiro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const salvar = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const novoBarbeiro = {
        id: Date.now(),
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
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <Text style={styles.header}>Cadastro de Barbeiro</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de senha com ícone de olho */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#94A3B8"
          secureTextEntry={!mostrarSenha}
          onChangeText={setSenha}
          value={senha}
          style={styles.inputSenha}
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Icon 
            name={mostrarSenha ? "eye-off-outline" : "eye-outline"} 
            size={22} 
            color="#FFD700" 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={salvar} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { 
    color: '#FFD700', 
    fontSize: width < 400 ? 22 : isWeb ? 32 : 28, 
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
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16,
    width: '100%',
    height: isWeb ? 60 : (height * 0.065 > 55 ? 55 : height * 0.065)
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#444',
    width: '100%',
    justifyContent: 'space-between'
  },
  inputSenha: {
    flex: 1,
    color: '#fff',
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16,
    height: isWeb ? 60 : (height * 0.065 > 55 ? 55 : height * 0.065),
    marginRight: 8
  },
  button: {
    backgroundColor: '#FFD700',
    padding: width < 400 ? 12 : 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    maxWidth: isWeb ? 500 : 400,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16
  }
});
