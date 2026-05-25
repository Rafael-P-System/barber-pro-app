import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Linking, 
  Alert, 
  StyleSheet, 
  Dimensions, 
  Platform,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

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
      if (!usuarioData) {
        Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
        setLoading(false);
        return;
      }

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
      Alert.alert("Sucesso!", "Seu horário foi reservado com sucesso!");

    } catch (error) {
      const msgErro = error.response?.data?.erro || "Falha ao salvar agendamento.";
      Alert.alert("Erro de Agendamento", msgErro);
    } finally {
      setLoading(false);
    }
  };

  const abrirWhatsApp = () => {
    const mensagem = `Olá! Tenho uma dúvida sobre meu agendamento do serviço (${servicoNome} às ${horario?.hora})`;
    const url = `https://wa.me/5521969412331?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <SafeAreaView style={styles.content}>
        
        {agendadoComSucesso ? (
          <Text style={styles.titleSuccess}>✅ Agendado com Sucesso!</Text>
        ) : (
          <Text style={styles.title}>Confirme seu Horário</Text>
        )}

        <View style={styles.card}>
          <Icon name="calendar-clock" size={40} color="#FFD700" style={{ marginBottom: 10 }} />
          <Text style={styles.servico}>{servicoNome}</Text>
          <Text style={styles.horario}>Horário: {horario?.hora}</Text>
        </View>

        {!agendadoComSucesso ? (
          <TouchableOpacity 
            onPress={confirmarAgendamento} 
            style={styles.btnConfirmar}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.btnConfirmarText}>Confirmar e Salvar</Text>}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={abrirWhatsApp} style={styles.btnWhats}>
            <Icon name="whatsapp" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.btnText}>Falar no WhatsApp</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          onPress={() => {
            if (agendadoComSucesso) {
              navigation.reset({ index: 0, routes: [{ name: 'Cliente' }] });
            } else {
              navigation.goBack();
            }
          }} 
          style={styles.btnVoltar}
        >
          <Icon 
            name={agendadoComSucesso ? "home" : "arrow-left"} 
            size={18} 
            color={agendadoComSucesso ? "#FFD700" : "#94A3B8"} 
          />
          <Text style={[styles.voltarText, agendadoComSucesso && { color: '#FFD700', marginLeft: 8 }]}>
            {agendadoComSucesso ? "Voltar para o Início" : "Cancelar e Voltar"}
          </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { color: '#FFD700', fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  titleSuccess: { color: '#4ADE80', fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#1E293B', padding: 25, borderRadius: 12, width: '100%', maxWidth: 400, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  servico: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  horario: { color: '#94A3B8', marginTop: 8, fontSize: 16, fontWeight: '600' },
  btnConfirmar: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, marginTop: 30, width: '100%', maxWidth: 400, alignItems: 'center' },
  btnConfirmarText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  btnWhats: { flexDirection: 'row', backgroundColor: '#25D366', padding: 15, borderRadius: 10, marginTop: 30, width: '100%', maxWidth: 400, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  btnVoltar: { flexDirection: 'row', marginTop: 15, padding: 15, borderRadius: 10, backgroundColor: '#1E293B', borderWidth: 1, borderColor: '#334155', width: '100%', maxWidth: 400, alignItems: 'center', justifyContent: 'center' },
  voltarText: { color: '#94A3B8', fontWeight: 'bold', fontSize: 16 }
});