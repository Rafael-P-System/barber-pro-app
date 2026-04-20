import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function ClienteScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bem-vindo, Cliente!</Text>
        <Text style={styles.title}>Área do Cliente</Text>

        {/* Botão de logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Serviços disponíveis</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Nenhum agendamento encontrado.</Text>
        </View>

        {/* Botão para ver serviços */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.servicesBtn}>
          <Text style={styles.servicesText}>Ver serviços</Text>
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
  servicesBtn: { marginTop: 20, backgroundColor: '#0A84FF', padding: 12, borderRadius: 10, alignItems: 'center' },
  servicesText: { color: '#fff', fontWeight: 'bold', fontSize: width < 400 ? 14 : 16 }
});
