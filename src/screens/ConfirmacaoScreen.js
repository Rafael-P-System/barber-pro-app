import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView, Linking, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ConfirmacaoScreen({ route, navigation }) {
  const { servico, horario } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [agendadoComSucesso, setAgendadoComSucesso] = useState(false);
  const [agendamentoId, setAgendamentoId] = useState(null);

  const servicoId = typeof servico === 'object' ? servico.id : servico;

  const confirmarAgendamento = async () => {
    setLoading(true);
    try {
      const usuarioData = await AsyncStorage.getItem('clienteLogado');
      const clienteObj = JSON.parse(usuarioData);
      
      // CORREÇÃO: Adicionado /api ao início da rota
      const response = await api.post('/api/agendamentos/agendar', {
        data: new Date().toISOString().split('T')[0],
        hora: horario?.hora,
        status: "AGENDADO",
        cliente: { id: clienteObj.id },
        barbeiro: { id: 1 },
        servico: { id: servicoId }
      });

      setAgendamentoId(response.data.id);
      setAgendadoComSucesso(true);
      Alert.alert("Sucesso!", "Agendamento confirmado!");
    } catch (error) {
      Alert.alert("Erro", error.response?.data?.erro || "Falha ao agendar.");
    } finally {
      setLoading(false);
    }
  };

  const cancelarNoBanco = async () => {
    try {
      setLoading(true);
      // CORREÇÃO: Adicionado /api ao início da rota
      await api.delete(`/api/agendamentos/cancelar/${agendamentoId}`);
      Alert.alert("Cancelado", "Seu agendamento foi removido.");
      navigation.reset({ index: 0, routes: [{ name: 'Cliente' }] });
    } catch (error) {
      Alert.alert("Erro", "Falha ao cancelar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.card}>
          <Text style={[styles.titulo, { color: agendadoComSucesso ? '#4ADE80' : '#FFD700' }]}>
            {agendadoComSucesso ? "✅ Confirmado!" : "Confirme seu Horário"}
          </Text>

          {!agendadoComSucesso ? (
            <TouchableOpacity onPress={confirmarAgendamento} style={styles.btnConfirmar}>
              {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.btnTexto}>Confirmar e Salvar</Text>}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/5521969412331')} style={styles.btnWhats}>
              <Text style={styles.btnTextoWhite}>Dúvidas no WhatsApp</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => agendadoComSucesso ? cancelarNoBanco() : navigation.goBack()} style={styles.btnVoltar}>
            <Text style={styles.textoVoltar}>{agendadoComSucesso ? "Cancelar Agendamento" : "Voltar"}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 400, alignItems: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  btnConfirmar: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  btnWhats: { flexDirection: 'row', backgroundColor: '#25D366', padding: 15, borderRadius: 10, width: '100%', justifyContent: 'center' },
  btnTexto: { fontWeight: 'bold', color: '#000' },
  btnTextoWhite: { color: '#fff', fontWeight: 'bold' },
  btnVoltar: { marginTop: 20 },
  textoVoltar: { color: '#f87171', fontWeight: 'bold' }
});