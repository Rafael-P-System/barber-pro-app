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
const isWeb = Platform.OS === 'web';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const realizarLogin = async (tipoBotaoClicado) => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      // 🎯 Lógica corrigida: Admin e Barbeiro usam /admin, Cliente usa /api/clientes
      const endpoint = (tipoBotaoClicado === 'admin' || tipoBotaoClicado === 'barbeiro') 
        ? '/admin/login' 
        : '/api/clientes/login';

      const response = await api.post(endpoint, { email, senha });

      if (response.status === 200) {
        let tokenBruto = response.data?.token || response.data;
        if (!tokenBruto) throw new Error("Token não recebido.");
        
        let token = String(tokenBruto).replace(/"/g, '');
        if (Platform.OS === 'web') localStorage.setItem('@BarberPro:token', token);
        else await AsyncStorage.setItem('@BarberPro:token', token);

        // 🚀 Redirecionamento Dinâmico
        if (tipoBotaoClicado === 'admin') navigation.navigate('AdminDashboard');
        else if (tipoBotaoClicado === 'barbeiro') navigation.navigate('Barbeiro');
        else navigation.navigate('Cliente');
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "E-mail ou senha incorretos.");
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
              <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="cover"/>
            </View>
            
            <Text style={styles.title}>Barber Pro</Text>
            <Text style={styles.subtitle}>Sistema de Gestão Master</Text>

            <View style={styles.inputContainer}>
              <Icon name="email-outline" size={22} color="#FFD700" style={styles.icon}/>
              <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#888" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock-outline" size={22} color="#FFD700" style={styles.icon}/>
              <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#888" value={senha} onChangeText={setSenha} secureTextEntry={!mostrarSenha}/>
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
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', paddingVertical: 20, alignItems: 'center' },
  card: { backgroundColor: 'rgba(26,26,26,0.9)', padding: 25, borderRadius: 20, alignItems: 'center', width: '90%', maxWidth: 420 },
  logoContainer: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#FFD700', justifyContent: 'center', alignItems: 'center', marginBottom: 15, overflow: 'hidden' },
  logo: { width: '100%', height: '100%' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFD700', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 25 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', borderRadius: 10, marginBottom: 12, paddingHorizontal: 10, width: '100%' },
  icon: { marginRight: 8 },
  input: { flex: 1, height: 55, color: '#FFFFFF', fontSize: 16 },
  buttonContainer: { width: '100%', marginTop: 10 },
  button: { width: '100%', height: 55, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  buttonClient: { backgroundColor: '#444' },
  buttonBarber: { backgroundColor: '#FFD700' },
  buttonAdmin: { backgroundColor: '#00CED1' },
  buttonText: { fontWeight: 'bold', color: '#FFF', fontSize: 16 },
  linkText: { color: '#FFD700', marginTop: 15 }
});

export default LoginScreen;