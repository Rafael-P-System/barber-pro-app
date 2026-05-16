import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Alert, 
  Platform,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const salvarCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    try {
      // Conexão com o backend oficial no Render
      const response = await api.post('/clientes/cadastro', { nome, email, senha });
      
      if (response.status === 200 || response.status === 201) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.replace('Login');
      } else {
        Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.status === 400 
        ? "E-mail já cadastrado." 
        : "Erro de conexão. Verifique se o servidor Java está rodando.";
      Alert.alert('Erro', msg);
    }
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, width: '100%' }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <View style={styles.card}>
            <Text style={styles.header}>Cadastro de Cliente</Text>

            {/* Input de Nome com Ícone */}
            <View style={styles.inputContainer}>
              <Icon name="account-outline" size={22} color="#FFD700" style={styles.icon}/>
              <TextInput
                style={styles.inputField}
                placeholder="Nome"
                placeholderTextColor="#888"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>

            {/* Input de E-mail com Ícone */}
            <View style={styles.inputContainer}>
              <Icon name="email-outline" size={22} color="#FFD700" style={styles.icon}/>
              <TextInput
                style={styles.inputField}
                placeholder="E-mail"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Input de Senha com Ícone e Mostrar/Esconder */}
            <View style={styles.inputContainer}>
              <Icon name="lock-outline" size={22} color="#FFD700" style={styles.icon}/>
              <TextInput
                style={styles.inputSenha}
                placeholder="Senha"
                placeholderTextColor="#888"
                secureTextEntry={!mostrarSenha}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <Icon 
                  name={mostrarSenha ? "eye-off-outline" : "eye-outline"} 
                  size={22} 
                  color="#FFD700" 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={salvarCadastro}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace('Login')}>
              <Text style={styles.backButtonText}>Voltar ao Login</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: 20
  },
  card: {
    backgroundColor: 'rgba(26,26,26,0.9)',
    padding: width < 400 ? 20 : width * 0.08,
    borderRadius: 20,
    width: isWeb ? (width > 800 ? 500 : 420) : width * 0.9,
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: { 
    color: '#FFD700', 
    fontSize: width < 400 ? 22 : isWeb ? 32 : 28, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textAlign: 'center' 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'space-between'
  },
  icon: { marginRight: 8 },
  inputField: {
    flex: 1,
    color: '#FFF',
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16,
    height: isWeb ? 60 : (height * 0.065 > 55 ? 55 : height * 0.065),
  },
  inputSenha: {
    flex: 1,
    color: '#FFF',
    fontSize: isWeb ? 18 : 16,
    height: isWeb ? 60 : (height * 0.065 > 55 ? 55 : height * 0.065),
    marginRight: 8
  },
  button: {
    backgroundColor: '#FFD700',
    height: isWeb ? 60 : (height * 0.065 > 55 ? 55 : height * 0.065),
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16
  },
  backButton: { marginTop: 15 },
  backButtonText: {
    color: '#FFD700',
    fontSize: width < 400 ? 13 : isWeb ? 16 : 15,
    fontWeight: '600'
  }
});