import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Switch, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import api from '../../services/api';

export default function AdminDashboard() {
  const [barbearias, setBarbearias] = useState([]);

  useEffect(() => {
    carregarBarbearias();
  }, []);

  const carregarBarbearias = async () => {
    try {
      const response = await api.get('/admin/barbearias'); // rota no backend Java
      setBarbearias(response.data);
    } catch (error) {
      console.error('Erro ao carregar barbearias:', error);
    }
  };

  const toggleStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 'ATIVO' ? 'SUSPENSO' : 'ATIVO';
    try {
      await api.put(`/admin/barbearia/${id}/status`, { status: novoStatus });
      carregarBarbearias(); // atualiza lista
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const abrirWhatsapp = (telefone) => {
    Linking.openURL(`https://wa.me/55${telefone}?text=Olá, Rafael aqui. Verificamos uma pendência no seu sistema.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestão de Clientes (Rafael)</Text>
      <FlatList
        data={barbearias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.nome}>{item.nomeBarbearia}</Text>
              <Text style={styles.vencimento}>Vence dia: {item.diaVencimento}</Text>
              <Text style={item.status === 'ATIVO' ? styles.ativo : styles.suspenso}>
                {item.status}
              </Text>
            </View>
            <View style={styles.acoes}>
              <Switch
                value={item.status === 'ATIVO'}
                onValueChange={() => toggleStatus(item.id, item.status)}
              />
              <TouchableOpacity onPress={() => abrirWhatsapp(item.telefone)}>
                <Text style={styles.btnZap}>📱</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    elevation: 3,
  },
  nome: { fontSize: 18, fontWeight: 'bold' },
  vencimento: { color: '#666' },
  ativo: { color: 'green', fontWeight: 'bold' },
  suspenso: { color: 'red', fontWeight: 'bold' },
  acoes: { alignItems: 'center', justifyContent: 'space-between' },
  btnZap: { fontSize: 25, marginTop: 10 },
});
