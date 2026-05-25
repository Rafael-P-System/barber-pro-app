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

  // Carrega o ID real do cliente logado para não quebrar a validação do Java
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

  // Função para realizar um agendamento rápido
  const realizarAgendamentoRapido = async () => {
    if (!clienteId) {
      Alert.alert("Erro", "Sua sessão está inválida. Faça login novamente.");
      return;
    }

    setLoading(true);
    try {
      // 🎯 CORREÇÃO: Enviando o JSON no formato que o AgendamentoController.java exige!
      const response = await api.post('/agendamentos/agendar', {
        data: new Date().toISOString().split('T')[0],
        hora: "10:00", 
        status: "AGENDADO",
        cliente: { id: clienteId }, // Relacionamento correto
        barbeiro: { id: 1 }, 
        servico: { id: 1 } // Serviço padrão para o teste rápido
      });

      Alert.alert("Sucesso!", "Seu horário de teste foi reservado.");

    } catch (error) {
      console.error("❌ Erro no Agendamento Rápido:", error.response?.data || error.message);
      
      if (error.response && error.response.status === 403) {
        Alert.alert("Erro de Autenticação", "Sua sessão expirou. Por favor, faça login novamente.");
        navigation.navigate('Login');
      } else {
        const msg = error.response?.data?.erro || "Não foi possível realizar o agendamento de teste.";
        Alert.alert("Erro", msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🎯 PADRONIZADO: Mesmas cores de fundo em degradê do app
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

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Seus agendamentos</Text>
          
          <View style={styles.cardEmpty}>
            {loading ? (
              <ActivityIndicator color="#FFD700" />
            ) : (
              <>
                <Icon name="calendar-blank" size={36} color="#64748B" style={{ marginBottom: 8 }} />
                <Text style={styles.emptyStateText}>Nenhum agendamento encontrado.</Text>
              </>
            )}
          </View>

          {/* 🎯 PADRONIZADO: Botão Principal Amarelo/Dourado Premium */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('Home')} 
            style={styles.btnPrincipal}
          >
            <Icon name="calendar-plus" size={20} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.btnPrincipalText}>Ver serviços e horários</Text>
          </TouchableOpacity>

          {/* Botão de teste rápido verde para validação em tempo real */}
          <TouchableOpacity 
            onPress={realizarAgendamentoRapido} 
            style={styles.btnTeste}
            disabled={loading}
          >
            <Icon name="flash" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.btnTesteText}>Agendamento Rápido (Teste)</Text>
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
  welcome: { color: '#94A3B8', fontSize: width < 400 ? 14 : 16 },
  title: { color: '#fff', fontSize: width < 400 ? 20 : 24, fontWeight: 'bold' },
  
  logoutBtn: { 
    flexDirection: 'row',
    backgroundColor: 'rgba(248, 113, 113, 0.1)', 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 8,
    alignItems: 'center'
  },
  logoutText: { color: '#f87171', fontWeight: 'bold' },
  
  content: { flex: 1, paddingHorizontal: 25 },
  sectionTitle: { color: '#fff', fontSize: width < 400 ? 16 : 18, fontWeight: 'bold', marginBottom: 15 },
  
  cardEmpty: { 
    backgroundColor: '#1E293B',
    padding: 30, 
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 10
  },
  emptyStateText: { color: '#64748B', textAlign: 'center', fontSize: width < 400 ? 13 : 15 },
  
  btnPrincipal: { 
    flexDirection: 'row',
    backgroundColor: '#FFD700', // Dourado padrão do app
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  btnPrincipalText: { color: '#000', fontWeight: 'bold', fontSize: width < 400 ? 15 : 16 },
  
  btnTeste: {
    flexDirection: 'row',
    backgroundColor: '#22C55E', // Verde de sucesso mantido para destacar o teste
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  btnTesteText: { color: '#fff', fontWeight: 'bold', fontSize: width < 400 ? 15 : 16 }
});