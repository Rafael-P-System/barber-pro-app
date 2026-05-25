import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';

export default function BarberScreen({ navigation }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarAgendamentos = async () => {
    try {
      setLoading(true);
      // Chamada completa com o prefixo /api
      const response = await api.get('/api/agendamentos');
      setAgendamentos(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const deletarAgendamento = async (id) => {
    try {
      // Chamada completa com o prefixo /api
      await api.delete(`/api/agendamentos/cancelar/${id}`);
      Alert.alert("Sucesso", "Agendamento removido.");
      carregarAgendamentos();
    } catch (error) {
      Alert.alert("Erro", "Falha ao remover.");
    }
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.titulo}>Área do Barbeiro</Text>
            <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate('Login')}>
              <Icon name="logout" size={18} color="#FFF" />
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitulo}>Agendamentos de Hoje</Text>

          {loading ? (
            <ActivityIndicator color="#FFD700" size="large" style={{ marginTop: 20 }} />
          ) : agendamentos.length > 0 ? (
            agendamentos.map((item) => (
              <View key={item.id} style={styles.itemAgendamento}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.nomeCliente}>{item.cliente?.nome || "Cliente"}</Text>
                  <Text style={styles.infoServico}>{item.servico?.nome || "Serviço"} - {item.hora}</Text>
                </View>
                <TouchableOpacity style={styles.btnDelete} onPress={() => deletarAgendamento(item.id)}>
                  <Icon name="trash-can-outline" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum agendamento pendente.</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContainer: { padding: 20, flexGrow: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 20 },
  titulo: { color: '#FFD700', fontSize: 24, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#EF4444', padding: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  logoutText: { color: '#FFF', fontWeight: 'bold', marginLeft: 4 },
  subtitulo: { color: '#FFF', fontSize: 18, marginVertical: 15, fontWeight: 'bold' },
  itemAgendamento: { backgroundColor: '#1E293B', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderLeftWidth: 4, borderLeftColor: '#FFD700' },
  nomeCliente: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  infoServico: { color: '#94A3B8', fontSize: 14 },
  btnDelete: { backgroundColor: '#EF4444', padding: 10, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  emptyText: { color: '#64748B', textAlign: 'center', marginTop: 20 }
});