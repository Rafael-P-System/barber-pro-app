import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, 
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, 
  Image, Dimensions 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const realizarLogin = async (tipoBotaoClicado) => {
    if (!email || !senha) {
      const msg = 'Preencha todos os campos';
      if (Platform.OS === 'web') window.alert(msg);
      else Alert.alert('Erro', msg);
      return;
    }

    setLoading(true);
    try {
      // 🎯 CORREÇÃO 1: Define a rota certa no Java baseada no botão clicado!
      const endpoint = tipoBotaoClicado === 'cliente' 
        ? '/api/clientes/login' 
        : '/admin/login'; 

      const response = await api.post(endpoint, { email, senha });

      if (response.status === 200) {
        const usuario = response.data;
        let tokenBruto = usuario?.token || usuario;
        if (!tokenBruto) throw new Error("Token não recebido.");
        
        let token = String(tokenBruto).replace(/"/g, '');
        
        // 🎯 CORREÇÃO 2: Valida se o nível retornado pelo Java confere com a intenção do login
        const nivelUsuario = usuario.nivel ? String(usuario.nivel).toUpperCase() : '';

        if (tipoBotaoClicado === 'cliente' && nivelUsuario !== 'CLIENTE') {
          throw { response: { status: 403, data: { erro: "Este e-mail pertence a um Barbeiro ou Admin. Use o botão correspondente." } } };
        }

        if (tipoBotaoClicado === 'barbeiro' && nivelUsuario !== 'BARBEIRO') {
          throw { response: { status: 403, data: { erro: "Seu usuário não possui nível de Barbeiro." } } };
        }

        if (tipoBotaoClicado === 'admin' && nivelUsuario !== 'ADM') {
          throw { response: { status: 403, data: { erro: "Apenas administradores master podem acessar por este botão." } } };
        }

        // Se passar nas travas, guarda o token e os dados da sessão
        if (Platform.OS === 'web') {
          localStorage.setItem('@BarberPro:token', token);
          localStorage.setItem('clienteLogado', JSON.stringify(usuario));
        } else {
          await AsyncStorage.setItem('@BarberPro:token', token);
          await AsyncStorage.setItem('clienteLogado', JSON.stringify(usuario));
        }

        // Redireciona cada um para a sua respectiva tela inicial
        if (tipoBotaoClicado === 'admin') {
          navigation.navigate('AdminDashboard');
        } else if (tipoBotaoClicado === 'barbeiro') {
          navigation.navigate('Barbeiro');
        } else {
          navigation.navigate('Cliente');
        }
      }
    } catch (error) {
      console.error(error);
      // Pega a mensagem exata configurada nas exceções ou no Java (status 403)
      const msgErro = error.response?.data?.erro || "E-mail ou senha incorretos ou erro de conexão.";
      
      if (Platform.OS === 'web') {
        window.alert(msgErro);
      } else {
        Alert.alert("Acesso Negado", msgErro);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, width: '100%' }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="cover"/>
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
                autoCorrect={false}
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
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    paddingVertical: 20, 
    alignItems: 'center',
    width: '100%'
  },
  card: { 
    backgroundColor: 'rgba(26,26,26,0.9)', 
    padding: 25, 
    borderRadius: 20, 
    alignItems: 'center', 
    width: '90%', 
    maxWidth: 420 
  },
  logoContainer: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    borderWidth: 2, 
    borderColor: '#FFD700', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 15, 
    overflow: 'hidden' 
  },
  logo: {  width: '100%', height: '100%' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFD700', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 25 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#333', 
    borderRadius: 10, 
    marginBottom: 12, 
    paddingHorizontal: 15, 
    width: '100%' 
  },
  icon: { marginRight: 8 },
  input: { 
    flex: 1, 
    height: 55, 
    color: '#FFFFFF', 
    fontSize: 16,
    paddingLeft: 4,
    paddingRight: 10
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