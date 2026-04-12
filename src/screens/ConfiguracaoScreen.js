import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function ConfiguracaoScreen({ navigation }) {

  // Função para deslogar
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  // Função para deletar conta no MySQL via Java
  const handleDeleteAccount = async () => {
    Alert.alert(
      "Excluir Conta",
      "Isso apagará permanentemente seu cadastro e histórico de agendamentos. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: async () => {
            try {
              const userData = await AsyncStorage.getItem('clienteLogado');
              const user = JSON.parse(userData);

              // Chama o DELETE no seu Controller Java
              await api.delete(`/cliente/${user.id}`); 

              await AsyncStorage.clear();
              navigation.replace('Login');
              Alert.alert("Conta excluída", "Seus dados foram removidos do nosso sistema.");
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a conta. Tente novamente.");
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Configurações</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>
        
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.itemText}>Editar Perfil</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleLogout}>
          <Text style={[styles.itemText, { color: '#0A84FF' }]}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacidade e Segurança</Text>
        
        <TouchableOpacity style={styles.item} onPress={handleDeleteAccount}>
          <Text style={[styles.itemText, { color: '#F87171' }]}>Excluir Minha Conta</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>Barbearia App v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  header: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 40, marginBottom: 30 },
  section: { backgroundColor: '#1E293B', borderRadius: 12, padding: 10, marginBottom: 20 },
  sectionTitle: { color: '#94A3B8', fontSize: 13, fontWeight: 'bold', marginLeft: 10, marginBottom: 10, textTransform: 'uppercase' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#334155' },
  itemText: { color: '#fff', fontSize: 16 },
  arrow: { color: '#94A3B8', fontSize: 20 },
  version: { color: '#475569', textAlign: 'center', marginTop: 20, fontSize: 12 }
});