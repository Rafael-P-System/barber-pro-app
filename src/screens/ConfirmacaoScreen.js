import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, Linking, Alert, 
  StyleSheet, ActivityIndicator, SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ConfirmacaoScreen({ route, navigation }) {
  const { servico, horario } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [agendadoComSucesso, setAgendadoComSucesso] = useState(false);

  const servicoId = typeof servico === 'object' ? servico.id : servico;
  const servicoNome = typeof servico === 'object' ? servico.nome : `Serviço nº ${servico}`;

  const confirmarAgendamento = async () => {
    setLoading(true);
    try {
      const usuarioData = await AsyncStorage.getItem('clienteLogado');
      const clienteObj = JSON.parse(usuarioData);
      
      await api.post('/agendamentos/agendar', {
        data: new Date().toISOString().split('T')[0],
        hora: horario?.hora,
        status: "AGENDADO",
        cliente: { id: clienteObj.id },
        barbeiro: { id: 1 },
        servico: { id: servicoId }
      });

      setAgendadoComSucesso(true);
      Alert.alert("Sucesso!", "Agendamento confirmado com sucesso!");
    } catch (error) {
      const msgErro = error.response?.data?.message || "Erro ao agendar.";
      Alert.alert("Erro", msgErro);
    } finally {
      setLoading(false);
    }
  };

  const handleVoltarOuCancelar = () => {
    if (agendadoComSucesso) {
      Alert.alert("Cancelar", "Deseja realmente cancelar este agendamento?", [
        { text: "Não", style: "cancel" },
        { text: "Sim, Cancelar", style: "destructive", onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Cliente' }] }) }
      ]);
    } else {
      navigation.goBack();
    }
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.responsiveWrapper}>
          <Text style={agendadoComSucesso ? styles.titleSuccess : styles.title}>
            {agendadoComSucesso ? "✅ Agendado!" : "Confirme seu Horário"}
          </Text>

          <View style={styles.card}>
            <Icon name="calendar-clock" size={40} color="#FFD700" />
            <Text style={styles.servico}>{servicoNome}</Text>
            <Text style={styles.horario}>Horário: {horario?.hora}</Text>
          </View>

          {!agendadoComSucesso ? (
            <TouchableOpacity onPress={confirmarAgendamento} style={styles.btnConfirmar} disabled={loading}>
              {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.btnConfirmarText}>Confirmar e Salvar</Text>}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/5521969412331`)} style={styles.btnWhats}>
              <Icon name="whatsapp" size={24} color="#fff" />
              <Text style={styles.btnText}>Dúvidas no WhatsApp</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={handleVoltarOuCancelar} style={styles.btnVoltar}>
            <Icon name="close-circle-outline" size={18} color="#f87171" />
            <Text style={styles.voltarText}>
              {agendadoComSucesso ? "Cancelar Agendamento" : "Cancelar e Voltar"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  responsiveWrapper: { width: '100%', maxWidth: 400, alignItems: 'center' },
  title: { color: '#FFD700', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  titleSuccess: { color: '#4ADE80', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#1E293B', padding: 25, borderRadius: 12, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  servico: { color: '#fff', fontSize: 18, marginTop: 10, fontWeight: 'bold' },
  horario: { color: '#94A3B8', marginTop: 5 },
  btnConfirmar: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, marginTop: 30, width: '100%', alignItems: 'center' },
  btnConfirmarText: { color: '#000', fontWeight: 'bold' },
  btnWhats: { flexDirection: 'row', backgroundColor: '#25D366', padding: 15, borderRadius: 10, marginTop: 30, width: '100%', alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', marginLeft: 10 },
  btnVoltar: { flexDirection: 'row', marginTop: 15, padding: 15, width: '100%', alignItems: 'center', justifyContent: 'center' },
  voltarText: { color: '#f87171', fontWeight: 'bold', marginLeft: 8 }
});