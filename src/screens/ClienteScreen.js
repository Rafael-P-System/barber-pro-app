import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// 🔥 Importando a sua instância configurada do Axios (com a URL do Render e o Token)
import api from '../services/api'; 

const { width } = Dimensions.get('window');

export default function ClienteScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  // Pegando o nome do cliente que veio do Login (exemplo)
  const clienteNome = route.params?.nome || "Cliente"; 

  // Função para realizar um agendamento rápido
  const realizarAgendamentoRapido = async () => {
    setLoading(true);
    try {
      // 🔥 Usando 'api.post' (aponta para o Render) e deixando a rota relativa correta do Spring Boot
      const response = await api.post('/agendamentos/agendar', {
        cliente: clienteNome,
        hora: "10:00", // Aqui você pegaria de um seletor de horários
        barbeiro: { id: 1 } // ID do barbeiro selecionado
      });

      if (response.data === "Dia cheio. Cliente adicionado na fila.") {
        Alert.alert("Fila de Espera", "Não temos horários para hoje, mas você foi adicionado à fila!");
      } else {
        Alert.alert("Sucesso!", "Seu horário foi reservado.");
      }

    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 503) {
        // Trava SaaS: Mensagem de manutenção para não constranger o barbeiro
        Alert.alert("Aviso", "O sistema está em manutenção temporária. Tente novamente mais tarde.");
      } else if (error.response && error.response.status === 403) {
        // Caso o token JWT esteja inválido ou expirado
        Alert.alert("Erro de Autenticação", "Sua sessão expirou. Por favor, faça login novamente.");
        // 🔥 CORREÇÃO: Alterado de replace para navigate para evitar o crash de undefined
        navigation.navigate('Login');
      } else {
        Alert.alert("Erro", "Não foi possível realizar o agendamento.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Bem-vindo, {clienteNome}!</Text>
          <Text style={styles.title}>Área do Cliente</Text>
        </View>

        {/* 🔥 CORREÇÃO: Alterado de replace para navigate no botão de Sair */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Seus agendamentos</Text>
        
        <View style={styles.emptyState}>
          {loading ? (
            <ActivityIndicator color="#FFD700" />
          ) : (
            <Text style={styles.emptyStateText}>Nenhum agendamento encontrado.</Text>
          )}
        </View>

        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')} 
          style={styles.servicesBtn}
        >
          <Text style={styles.servicesText}>Ver serviços e horários</Text>
        </TouchableOpacity>

        {/* Botão de teste para validar o seu Back-end novo */}
        <TouchableOpacity 
          onPress={realizarAgendamentoRapido} 
          style={[styles.servicesBtn, { backgroundColor: '#22C55E', marginTop: 10 }]}
        >
          <Text style={styles.servicesText}>Agendamento Rápido (Teste)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { 
    paddingTop: 60, 
    paddingHorizontal: 25, 
    paddingBottom: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  welcome: { color: '#94A3B8', fontSize: width < 400 ? 14 : 16 },
  title: { color: '#fff', fontSize: width < 400 ? 18 : 22, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: 'rgba(248, 113, 113, 0.1)', padding: 8, borderRadius: 8 },
  logoutText: { color: '#f87171', fontWeight: 'bold' },
  content: { flex: 1, paddingHorizontal: 25 },
  sectionTitle: { color: '#fff', fontSize: width < 400 ? 16 : 18, fontWeight: 'bold', marginBottom: 15 },
  emptyState: { padding: 20, alignItems: 'center' },
  emptyStateText: { color: '#64748B', textAlign: 'center', fontSize: width < 400 ? 12 : 14 },
  servicesBtn: { marginTop: 20, backgroundColor: '#0A84FF', padding: 15, borderRadius: 10, alignItems: 'center' },
  servicesText: { color: '#d9d0d0', fontWeight: 'bold', fontSize: width < 400 ? 14 : 16 }
});