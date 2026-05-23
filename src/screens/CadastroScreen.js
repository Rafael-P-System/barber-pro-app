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
  
  // 🔥 NOVO: Estado para controlar se é Cliente ou Barbeiro
  const [papel, setPapel] = useState('CLIENTE'); // Pode ser 'CLIENTE' ou 'BARBEIRO'

  const salvarCadastro = async () => {
    if (!nome || !email || !senha) {
      if (Platform.OS === 'web') {
        window.alert('Preencha todos os campos');
      } else {
        Alert.alert('Erro', 'Preencha todos os campos');
      }
      return;
    }
    try {
      // 🔥 Rota dinâmica ou unificada enviando a role selecionada pelo botão
      const response = await api.post('/api/clientes/cadastro', { 
        nome, 
        email, 
        senha,
        role: papel // Envia 'CLIENTE' ou 'BARBEIRO' dinamicamente
      });
      
      if (response.status === 200 || response.status === 201) {
        const msgSucesso = `Cadastro de ${papel === 'CLIENTE' ? 'Cliente' : 'Barbeiro'} realizado com sucesso!`;
        if (Platform.OS === 'web') {
          window.alert(msgSucesso);
        } else {
          Alert.alert('Sucesso', msgSucesso);
        }
        navigation.navigate('Login');
      } else {
        if (Platform.OS === 'web') {
          window.alert('Não foi possível realizar o cadastro.');
        } else {
          Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
        }
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.status === 400 
        ? "E-mail já cadastrado." 
        : "Erro de conexão. Verifique se o servidor Java está rodando.";
      
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Erro', msg);
      }
    }
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, width: '100%' }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <View style={styles.card}>
            {/* Título muda conforme a aba selecionada */}
            <Text style={styles.header}>
              Cadastro de {papel === 'CLIENTE' ? 'Cliente' : 'Barbeiro'}
            </Text>

            {/* 🔥 NOVO: Seletores de Papel (Abas) */}
            <View style={styles.selectorContainer}>
              <TouchableOpacity 
                style={[styles.selectorBtn, papel === 'CLIENTE' && styles.selectorActive]} 
                onPress={() => setPapel('CLIENTE')}
              >
                <Icon name="account" size={18} color={papel === 'CLIENTE' ? '#000' : '#FFD700'} />
                <Text style={[styles.selectorText, papel === 'CLIENTE' && styles.selectorTextActive]}>Cliente</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.selectorBtn, papel === 'BARBEIRO' && styles.selectorActive]} 
                onPress={() => setPapel('BARBEIRO')}
              >
                <Icon name="content-cut" size={18} color={papel === 'BARBEIRO' ? '#000' : '#FFD700'} />
                <Text style={[styles.selectorText, papel === 'BARBEIRO' && styles.selectorTextActive]}>Barbeiro</Text>
              </TouchableOpacity>
            </View>

            {/* Input de Nome */}
            <View style={styles.inputContainer}>
              <Icon name="account-outline" size={22} color="#FFD700" style={styles.icon}/>
              <TextInput
                style={styles.inputField}
                placeholder={papel === 'CLIENTE' ? "Nome Completo" : "Nome Profissional do Barbeiro"}
                placeholderTextColor="#888"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>

            {/* Input de E-mail */}
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
                autoCorrect={false} // ⚡ ADICIONADO: Proteção contra corretor ortográfico
              />
            </View>

            {/* Input de Senha */}
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
              <Text style={styles.buttonText}>Finalizar Cadastro</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
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
    marginBottom: 20, 
    textAlign: 'center' 
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#262424',
    borderRadius: 10,
    padding: 4,
    marginBottom: 25,
    width: '100%',
    borderWidth: 1,
    borderColor: '#444'
  },
  selectorBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  selectorActive: {
    backgroundColor: '#FFD700',
  },
  selectorText: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 14
  },
  selectorTextActive: {
    color: '#000',
  },
  // ⚡ ATUALIZADO: paddingHorizontal padronizado para 15
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#383535',
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 15, 
    width: '100%',
    borderWidth: 1,
    borderColor: '#ece2e2',
    justifyContent: 'space-between'
  },
  icon: { marginRight: 8 },
  // ⚡ ATUALIZADO: Adicionado paddingRight para textos longos de e-mail não colarem na borda
  inputField: {
    flex: 1,
    color: '#ede5e5',
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16,
    height: isWeb ? 60 : (height * 0.065 > 55 ? 55 : height * 0.065),
    paddingRight: 10, 
  },
  // ⚡ ATUALIZADO: paddingRight ajustado para proteger o texto perto do ícone do olho
  inputSenha: {
    flex: 1,
    color: '#FFF',
    fontSize: isWeb ? 18 : 16,
    height: isWeb ? 60 : (height * 0.065 > 55 ? 55 : height * 0.065),
    marginRight: 8,
    paddingRight: 10,
  },
  button: {
    backgroundColor: '#FFD700',
    height: isWeb ? 60 : (height * 0.065 > 55 ? 55 : height * 0.065),
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#000000',
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