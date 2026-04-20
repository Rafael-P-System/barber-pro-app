import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';

const { width } = Dimensions.get('window');

export default function BarberScreen({ navigation }) {
  const finalizarTurno = () => {
    Alert.alert("Turno finalizado", "Você encerrou o expediente com sucesso.");
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Área do Barbeiro</Text>

        {/* Botão de logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Resumo de Hoje</Text>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Cortes</Text>
          <Text style={styles.cardValue}>12</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Barbas</Text>
          <Text style={styles.cardValue}>8</Text>
        </View>
      </View>

      <Text style={styles.subtitulo}>Agendamentos</Text>
      <View style={styles.itemAgendamento}>
        <Text style={{ color: '#fff', flex: 1 }}>Corte - Pedro Santos</Text>
        <TouchableOpacity style={styles.btnDelete} onPress={() => Alert.alert("Agendamento removido")}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>X</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.btnStatus, { backgroundColor: '#0A84FF' }]} onPress={finalizarTurno}>
        <Text style={styles.btnText}>Finalizar Turno</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 20 },
  titulo: { color: '#fff', fontSize: width < 400 ? 18 : 22, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: 'rgba(248, 113, 113, 0.1)', padding: 8, borderRadius: 8 },
  logoutText: { color: '#f87171', fontWeight: 'bold' },
  subtitulo: { color: '#fff', fontSize: width < 400 ? 16 : 18, marginVertical: 15, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  card: { backgroundColor: '#1E293B', padding: width < 400 ? 12 : 15, borderRadius: 12, width: '48%', maxWidth: 220 },
  cardLabel: { color: '#94A3B8', fontSize: width < 400 ? 11 : 12 },
  cardValue: { color: '#fff', fontSize: width < 400 ? 16 : 18, fontWeight: 'bold' },
  btnStatus: { padding: width < 400 ? 12 : 15, borderRadius: 10, marginVertical: 10, width: '100%', maxWidth: 400, alignSelf: 'center' },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: width < 400 ? 14 : 16 },
  itemAgendamento: { backgroundColor: '#1E293B', padding: width < 400 ? 12 : 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: 500, alignSelf: 'center' },
  btnDelete: { backgroundColor: '#ef4444', padding: width < 400 ? 8 : 10, borderRadius: 8 }
});
