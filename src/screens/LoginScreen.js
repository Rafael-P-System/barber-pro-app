import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Image,
  Dimensions 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const realizarLogin = async (tipo) => {
    // ⚠️ Validação com alertas compatíveis com Web e Mobile
    if (!email || !senha) {
      if (Platform.OS === 'web') {
        window.alert('Preencha todos os campos');
      } else {
        Alert.alert('Erro', 'Preencha todos os campos');
      }
      return;
    }

    setLoading(true);
    try {
      // 🎯 CORREÇÃO: Encaminha a requisição diretamente para a rota existente no Back-end
      const endpoint = '/admin/login';

      const response = await api.post(endpoint, { 
        email: email, 
        senha: senha 
      });

      if (response.status === 200) {
        const token = response.data.token || response.data;

        // 🔥 Gravação do Token corrigida e segura para Web/Mobile
        if (Platform.OS === 'web') {
          localStorage.setItem('@BarberPro:token', token);
        } else {
          await AsyncStorage.setItem('@BarberPro:token', token);
        }

        // 🔄 Redirecionamentos de rota pós-login baseados no botão clicado
        if (tipo === 'admin') {
          if (Platform.OS === 'web') {
            window.alert("Bem-vindo, Rafael! Painel de Gestão liberado.");
          } else {
            Alert.alert("Bem-vindo, Rafael!", "Painel de Gestão liberado.");
          }
          navigation.replace('AdminDashboard');
        } else if (tipo === 'barbeiro') {
          navigation.replace('Barbeiro'); 
        } else {
          navigation.replace('Cliente');
        }
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.status === 401 
        ? "E-mail ou senha incorretos." 
        : error.response?.status === 404
        ? "Usuário não encontrado no banco de dados."
        : "Erro de conexão. Verifique se o servidor Java está rodando.";
      
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert("Erro", msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../assets/logo.png')} 
                style={styles.logo}
                resizeMode="cover"
              />
            </View>
            
            <Text style={styles.title}>Barber Pro</Text>
            <Text style={styles.subtitle}>Sistema de Gestão Master</Text>

            {/* Input de E-mail */}
            <View style={styles.inputContainer}>
              <Icon name="email-outline" size={22} color="#FFD700" style={styles.icon}/>
              <TextInput 
                style={styles.input} 
                placeholder="E-mail" 
                placeholderTextColor="#888" 
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Input de Senha */}
            <View style={styles.inputContainer}>
              <Icon name="lock-outline" size={22} color="#FFD700" style={styles.icon}/>
              <TextInput 
                style={styles.input} 
                placeholder="Senha" 
                placeholderTextColor="#888" 
                value={senha} 
                onChangeText={setSenha} 
                secureTextEntry={!mostrarSenha}
              />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <Icon name={mostrarSenha ? "eye-off-outline" : "eye-outline"} size={22} color="#FFD700" />
              </TouchableOpacity>
            </View>

            {/* Botões de Ação */}
            {loading ? (
              <ActivityIndicator size="large" color="#FFD700" style={{ marginVertical: 20 }} />
            ) : (
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.buttonClient]} onPress={() => realizarLogin('cliente')}>
                  <Text style={styles.buttonText}>Entrar como Cliente</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonBarber]} onPress={() => realizarLogin('barbeiro')}>
                  <Text style={[styles.buttonText, { color: '#000' }]}>Entrar como Barbeiro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonAdmin]} onPress={() => realizarLogin('admin')}>
                  <Text style={[styles.buttonText, { color: '#000' }]}>Entrar como Admin</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    paddingVertical: 20,
    alignItems: 'center'
  },
  card: { 
    backgroundColor: 'rgba(26,26,26,0.9)', 
    padding: width < 400 ? 20 : width * 0.08, 
    borderRadius: 20, 
    alignItems: 'center',
    width: isWeb ? (width > 800 ? 600 : 420) : width * 0.9,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: { 
    width: width * 0.25, 
    height: width * 0.25, 
    maxWidth: 110,
    maxHeight: 110,
    borderRadius: 55,
    borderWidth: 2, 
    borderColor: '#FFD700', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  logo: { width: '100%', height: '100%' },
  title: { 
    fontSize: width * 0.07 > 28 ? 28 : width * 0.07, 
    fontWeight: 'bold', 
    color: '#FFD700', 
    marginBottom: 5 
  },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 25 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between'
  },
  icon: { marginRight: 8 },
  input: { 
    flex: 1,
    height: 55, 
    color: '#FFFFFF', 
    fontSize: isWeb ? 18 : 16,
    marginRight: 8
  },
  buttonContainer: { width: '100%', marginTop: 10 },
  button: { 
    width: '100%', 
    height: 55, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 10
  },
  buttonClient: { backgroundColor: '#444' },
  buttonBarber: { backgroundColor: '#FFD700' },
  buttonAdmin: { backgroundColor: '#00CED1' },
  buttonText: { fontWeight: 'bold', color: '#FFF', fontSize: 16 },
  linkText: { color: '#FFD700', marginTop: 15 }
});

export default LoginScreen;