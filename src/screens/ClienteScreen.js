import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; 
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function ClienteScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [clienteId, setClienteId] = useState(null);
  const clienteNome = route.params?.nome || "Cliente"; 

  useEffect(() => {
    const carregarDadosCliente = async () => {
      try {
        const usuarioData = await AsyncStorage.getItem('clienteLogado');
        if (usuarioData) {
          const cliente = JSON.parse(usuarioData);
          setClienteId(cliente.id);
        }
      } catch (error) {
        console.error("Erro ao ler dados do cliente:", error);
      }
    };
    carregarDadosCliente();
  }, []);

  const realizarAgendamentoRapido = async () => {
    if (!clienteId) {
      Alert.alert("Erro", "Sua sessão está inválida. Faça login novamente.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/agendamentos/agendar', {
        data: new Date().toISOString().split('T')[0],
        hora: "10:00", 
        status: "AGENDADO",
        cliente: { id: clienteId },
        barbeiro: { id: 1 }, 
        servico: { id: 1 }
      });

      // Se sucesso, leva para a tela de confirmação
      navigation.navigate('ConfirmacaoScreen', { 
        servico: { id: 1, nome: "Corte Rápido (Teste)" }, 
        horario: { hora: "10:00" } 
      });

    } catch (error) {
      // Tratamento real para evitar [object Object]
      const msgErro = error.response?.data?.message || error.response?.data?.erro || "Não foi possível realizar o agendamento.";
      console.log("Erro completo:", error.response?.data);
      Alert.alert("Erro", msgErro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Bem-vindo, {clienteNome}!</Text>
            <Text style={styles.title}>Área do Cliente</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate('Login')}>
            <Icon name="logout" size={18} color="#f87171" style={{ marginRight: 4 }} />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Wrapper centralizado para responsividade */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Seus agendamentos</Text>
          
          <View style={styles.cardEmpty}>
            {loading ? (
              <ActivityIndicator color="#FFD700" size="large" />
            ) : (
              <>
                <Icon name="calendar-blank" size={36} color="#64748B" style={{ marginBottom: 8 }} />
                <Text style={styles.emptyStateText}>Nenhum agendamento encontrado.</Text>
              </>
            )}
          </View>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Home')} 
            style={styles.btnPrincipal}
          >
            <Icon name="calendar-plus" size={20} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.btnPrincipalText}>Ver serviços e horários</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={realizarAgendamentoRapido} 
            style={styles.btnTeste}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : (
              <>
                <Icon name="flash" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.btnTesteText}>Agendamento Rápido (Teste)</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { 
    paddingTop: 30, 
    paddingHorizontal: 25, 
    paddingBottom: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 25,
    width: '100%',
    maxWidth: 400,    // 🔥 Garante que no navegador fique centralizado e proporcional
    alignSelf: 'center'
  },
  welcome: { color: '#94A3B8', fontSize: 14 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  logoutBtn: { flexDirection: 'row', backgroundColor: 'rgba(248, 113, 113, 0.1)', padding: 8, borderRadius: 8, alignItems: 'center' },
  logoutText: { color: '#f87171', fontWeight: 'bold' },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  cardEmpty: { backgroundColor: '#1E293B', padding: 30, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#334155', marginBottom: 10 },
  emptyStateText: { color: '#64748B', textAlign: 'center', fontSize: 15 },
  btnPrincipal: { flexDirection: 'row', backgroundColor: '#FFD700', padding: 15, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 15 },
  btnPrincipalText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  btnTeste: { flexDirection: 'row', backgroundColor: '#22C55E', padding: 15, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  btnTesteText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});