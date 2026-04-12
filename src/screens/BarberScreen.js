import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Dimensions, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from "react-native-chart-kit";
import api from '../services/api';

export default function BarberScreen({ navigation }) {
  // Inicializamos com valores padrão para evitar erros de undefined
  const [stats, setStats] = useState({ faturamentoDia: 0, faturamentoMes: 0, totalAgendamentos: 0 });
  const [agendamentos, setAgendamentos] = useState([]);
  const [statusAberto, setStatusAberto] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      // 🕵️ QA: Alinhado para o singular /agendamento conforme seu Controller Java
      const resStats = await api.get('/agendamento/dashboard/faturamento');
      setStats(resStats.data || { faturamentoDia: 0, faturamentoMes: 0 });

      const resLista = await api.get('/agendamento');
      setAgendamentos(resLista.data || []);

      const status = await AsyncStorage.getItem('barbearia_status');
      if (status !== null) setStatusAberto(JSON.parse(status));
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const toggleStatus = async () => {
    const novo = !statusAberto;
    await AsyncStorage.setItem('barbearia_status', JSON.stringify(novo));
    setStatusAberto(novo);
    Alert.alert('Status', novo ? 'Agendamentos Abertos' : 'Agendamentos Fechados');
  };

  const removerAgendamento = async (id) => {
    try {
      // 🛡️ Visão de QA: Chama o DELETE no seu Java
      await api.delete(`/agendamento/${id}`);
      Alert.alert("Sucesso", "Agendamento removido.");
      carregarDados(); // Recarrega para atualizar o gráfico e a lista
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível remover o registro do banco.");
    }
  };

  // 📊 Lógica do Gráfico: Se o faturamento for 0, ele mostra uma linha na base
  const fatMes = stats.faturamentoMes || 0;
  const dataGrafico = {
    labels: ["S1", "S2", "S3", "S4"],
    datasets: [{ 
      data: fatMes > 0 
        ? [fatMes * 0.3, fatMes * 0.6, fatMes * 0.8, fatMes] 
        : [0, 0, 0, 0] 
    }]
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Painel Administrativo</Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={{ color: '#f87171', fontWeight: 'bold' }}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* CARDS DE FATURAMENTO */}
      <View style={styles.row}>
        <View style={[styles.card, { borderColor: '#4ADE80', borderWidth: 1 }]}>
          <Text style={styles.cardLabel}>Hoje</Text>
          <Text style={styles.cardValue}>R$ {stats.faturamentoDia?.toFixed(2) || "0.00"}</Text>
        </View>
        <View style={[styles.card, { borderColor: '#0A84FF', borderWidth: 1 }]}>
          <Text style={styles.cardLabel}>Este Mês</Text>
          <Text style={styles.cardValue}>R$ {stats.faturamentoMes?.toFixed(2) || "0.00"}</Text>
        </View>
      </View>

      {/* GRÁFICO RESILIENTE */}
      <LineChart
        data={dataGrafico}
        width={Dimensions.get("window").width - 40}
        height={180}
        chartConfig={chartConfig}
        bezier
        style={styles.grafico}
      />

      {/* CONTROLE OPERACIONAL */}
      <TouchableOpacity 
        onPress={toggleStatus} 
        style={[styles.btnStatus, { backgroundColor: statusAberto ? '#065f46' : '#991b1b' }]}
      >
        <Text style={styles.btnText}>BARBEARIA {statusAberto ? 'ABERTA' : 'FECHADA'}</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Próximos Clientes</Text>
      
      {/* LISTAGEM DE DADOS DO MYSQL */}
      {agendamentos.length === 0 ? (
        <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 20 }}>Nenhum agendamento encontrado.</Text>
      ) : (
        agendamentos.map((item) => (
          <View key={item.id} style={styles.itemAgendamento}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>👤 {item.cliente?.nome || 'Cliente'}</Text>
              <Text style={{ color: '#aaa' }}>✂️ {item.servico}</Text>
              {/* 🕒 Data em formato brasileiro */}
              <Text style={{ color: '#0A84FF' }}>
                ⏰ {item.dataHora ? new Date(item.dataHora).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '--:--'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removerAgendamento(item.id)} style={styles.btnDelete}>
              <Text style={{ color: '#fff' }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#1e293b",
  backgroundGradientTo: "#0f172a",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(74, 222, 128, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 20 },
  titulo: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  subtitulo: { color: '#fff', fontSize: 18, marginVertical: 15, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  card: { backgroundColor: '#1E293B', padding: 15, borderRadius: 12, width: '48%' },
  cardLabel: { color: '#94A3B8', fontSize: 12 },
  cardValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  grafico: { marginVertical: 15, borderRadius: 16 },
  btnStatus: { padding: 15, borderRadius: 10, marginVertical: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  itemAgendamento: { backgroundColor: '#1E293B', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  btnDelete: { backgroundColor: '#ef4444', padding: 10, borderRadius: 8 }
});