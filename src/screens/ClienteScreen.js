import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';

export default function ClienteScreen({ navigation }) {
  
  // Lista de categorias para facilitar a navegação do cliente
  const categorias = [
    { id: 1, nome: 'Cortes', icon: '✂️' },
    { id: 2, nome: 'Barba', icon: '🪒' },
    { id: 3, nome: 'Combos', icon: '🔥' },
    { id: 4, nome: 'Estética', icon: '✨' }, // Aqui entra a sobrancelha!
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER PERSONALIZADO */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Olá, Bem-vindo!</Text>
          <Text style={styles.title}>O que vamos fazer hoje?</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.replace('LoginScreen')}
          style={styles.logoutBtn}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        
        {/* CARD DE DESTAQUE: AGENDAMENTO RÁPIDO */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')}
          style={styles.mainCard}
          activeOpacity={0.9}
        >
          <View style={styles.mainCardInfo}>
            <Text style={styles.mainCardTitle}>Agendar agora</Text>
            <Text style={styles.mainCardSub}>Escolha seu barbeiro e horário favorito</Text>
          </View>
          <Text style={styles.mainCardIcon}>📅</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Categorias</Text>

        {/* LISTA DE CATEGORIAS */}
        <View style={styles.grid}>
          {categorias.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={styles.categoryName}>{cat.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ÁREA DE MEUS AGENDAMENTOS */}
        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Meus Agendamentos</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Você não possui agendamentos ativos.</Text>
          </View>
        </View>

      </ScrollView>
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
  welcome: { color: '#94A3B8', fontSize: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: 'rgba(248, 113, 113, 0.1)', padding: 8, borderRadius: 8 },
  logoutText: { color: '#f87171', fontWeight: 'bold' },
  
  content: { flex: 1, paddingHorizontal: 25 },
  
  mainCard: { 
    backgroundColor: '#3B82F6', 
    borderRadius: 20, 
    padding: 25, 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 30,
    elevation: 8,
    shadowColor: '#3B82F6',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  mainCardInfo: { flex: 1 },
  mainCardTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  mainCardSub: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 13, marginTop: 5 },
  mainCardIcon: { fontSize: 40 },

  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 30 },
  categoryCard: { 
    backgroundColor: '#1E293B', 
    width: '47%', 
    padding: 20, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155'
  },
  categoryIcon: { fontSize: 24, marginBottom: 8 },
  categoryName: { color: '#fff', fontWeight: '600' },

  historyCard: { 
    backgroundColor: '#1E293B', 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#334155'
  },
  historyTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  emptyState: { padding: 20, alignItems: 'center' },
  emptyStateText: { color: '#64748B', textAlign: 'center' }
});