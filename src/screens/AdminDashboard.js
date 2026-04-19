import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Switch, StyleSheet, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Se não tiver, use View com backgroundColor
import api from '../services/api'

export default function AdminDashboard() {
  const [barbearias, setBarbearias] = useState([]);

  useEffect(() => {
    carregarBarbearias();
  }, []);

  const carregarBarbearias = async () => {
    try {
      const response = await api.get('/admin/barbearias');
      setBarbearias(response.data);
    } catch (error) {
      console.error('Erro ao carregar barbearias:', error);
    }
  };

  const toggleStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 'ATIVO' ? 'SUSPENSO' : 'ATIVO';
    try {
      await api.put(`/admin/barbearia/${id}/status`, { status: novoStatus });
      carregarBarbearias();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const abrirWhatsapp = (telefone) => {
    Linking.openURL(`https://wa.me/55${telefone}?text=Olá, Rafael aqui. Verificamos uma pendência no seu sistema de barbearia.`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Gestão de Licenças</Text>
        <Text style={styles.headerSubtitle}>Controle de Clientes SaaS</Text>
      </View>

      <FlatList
        data={barbearias}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{item.nomeBarbearia}</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Vencimento:</Text>
                <Text style={styles.vencimento}> Dia {item.diaVencimento}</Text>
              </View>
              
              <View style={[styles.statusBadge, item.status === 'ATIVO' ? styles.badgeAtivo : styles.badgeSuspenso]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.acoesContainer}>
              <View style={styles.switchBox}>
                <Text style={styles.switchLabel}>{item.status === 'ATIVO' ? 'Liberado' : 'Bloqueado'}</Text>
                <Switch
                  trackColor={{ false: '#334155', true: '#10B981' }}
                  thumbColor={item.status === 'ATIVO' ? '#fff' : '#94A3B8'}
                  value={item.status === 'ATIVO'}
                  onValueChange={() => toggleStatus(item.id, item.status)}
                />
              </View>
              
              <TouchableOpacity 
                style={styles.zapButton} 
                onPress={() => abrirWhatsapp(item.telefone)}
                activeOpacity={0.7}
              >
                <Text style={styles.zapIcon}>📱</Text>
                <Text style={styles.zapText}>Notificar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F172A' // Dark Navy Blue (Visual Moderno)
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#1E293B',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10,
  },
  headerTitle: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#F8FAFC' 
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 5
  },
  listContent: {
    padding: 20,
    paddingBottom: 40
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    marginBottom: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  infoContainer: {
    marginBottom: 15
  },
  nome: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#F8FAFC',
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  label: {
    color: '#94A3B8',
    fontSize: 14
  },
  vencimento: { 
    color: '#F1F5F9',
    fontWeight: '600'
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  badgeAtivo: { backgroundColor: 'rgba(16, 185, 129, 0.2)' },
  badgeSuspenso: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
  statusText: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#F8FAFC' 
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 10
  },
  acoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  switchBox: {
    alignItems: 'flex-start'
  },
  switchLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase'
  },
  zapButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12
  },
  zapIcon: { fontSize: 18, marginRight: 8 },
  zapText: { color: '#fff', fontWeight: 'bold' }
});