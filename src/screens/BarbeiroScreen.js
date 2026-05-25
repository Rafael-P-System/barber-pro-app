import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, Platform, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; // Certifique-se que o caminho está correto

const { width } = Dimensions.get('window');

export default function BarberScreen({ navigation }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Busca os agendamentos reais da API
  const carregarAgendamentos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/agendamentos'); // Endpoint que retorna a lista
      setAgendamentos(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar a agenda.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  // 2. Função para deletar (agora real)
  const deletarAgendamento = async (id) => {
    try {
      await api.delete(`/agendamentos/cancelar/${id}`);
      Alert.alert("Sucesso", "Agendamento removido.");
      carregarAgendamentos(); // Atualiza a lista
    } catch (error) {
      Alert.alert("Erro", "Falha ao remover.");
    }
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
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
            <ActivityIndicator color="#FFD700" size="large" />
          ) : agendamentos.length > 0 ? (
            agendamentos.map((item) => (
              <View key={item.id} style={styles.itemAgendamento}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{item.cliente?.nome || "Cliente"}</Text>
                  <Text style={{ color: '#94A3B8', fontSize: 14 }}>{item.servico?.nome || "Serviço"} - {item.hora}</Text>
                </View>
                <TouchableOpacity style={styles.btnDelete} onPress={() => deletarAgendamento(item.id)}>
                  <Icon name="trash-can-outline" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={{ color: '#64748B', textAlign: 'center', marginTop: 20 }}>Nenhum agendamento pendente.</Text>
          )}

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ... (seus estilos permanecem os mesmos)