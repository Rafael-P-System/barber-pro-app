import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ConfirmacaoScreen({ route, navigation }) {
  const { servico, horario } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [agendadoComSucesso, setAgendadoComSucesso] = useState(false);
  const [agendamentoId, setAgendamentoId] = useState(null); // 🔥 Estado para o ID gerado

  const servicoId = typeof servico === 'object' ? servico.id : servico;
  const servicoNome = typeof servico === 'object' ? servico.nome : `Serviço nº ${servico}`;

  const confirmarAgendamento = async () => {
    setLoading(true);
    try {
      const usuarioData = await AsyncStorage.getItem('clienteLogado');
      const clienteObj = JSON.parse(usuarioData);
      
      const response = await api.post('/agendamentos/agendar', {
        data: new Date().toISOString().split('T')[0],
        hora: horario?.hora,
        status: "AGENDADO",
        cliente: { id: clienteObj.id },
        barbeiro: { id: 1 },
        servico: { id: servicoId }
      });

      setAgendamentoId(response.data.id); // Captura o ID do banco
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
      await api.delete(`/agendamentos/cancelar/${agendamentoId}`);
      Alert.alert("Cancelado", "Seu agendamento foi removido.");
      navigation.reset({ index: 0, routes: [{ name: 'Cliente' }] });
    } catch (error) {
      Alert.alert("Erro", "Falha ao cancelar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <View style={{ width: '100%', maxWidth: 400, alignItems: 'center' }}>
          <Text style={{ color: agendadoComSucesso ? '#4ADE80' : '#FFD700', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            {agendadoComSucesso ? "✅ Confirmado!" : "Confirme seu Horário"}
          </Text>

          {!agendadoComSucesso ? (
            <TouchableOpacity onPress={confirmarAgendamento} style={{ backgroundColor: '#FFD700', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' }}>
              {loading ? <ActivityIndicator color="#000" /> : <Text style={{ fontWeight: 'bold' }}>Confirmar e Salvar</Text>}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/5521969412331')} style={{ flexDirection: 'row', backgroundColor: '#25D366', padding: 15, borderRadius: 10, width: '100%', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Dúvidas no WhatsApp</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => agendadoComSucesso ? cancelarNoBanco() : navigation.goBack()} style={{ marginTop: 20 }}>
            <Text style={{ color: '#f87171', fontWeight: 'bold' }}>{agendadoComSucesso ? "Cancelar Agendamento" : "Voltar"}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}