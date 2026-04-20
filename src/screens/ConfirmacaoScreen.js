import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';


const { width } = Dimensions.get('window');

export default function ConfirmacaoScreen({ route, navigation }) {
  const { servico, horario, valor } = route.params;

  useEffect(() => {
    const salvarNoBanco = async () => {
      try {
        const usuarioData = await AsyncStorage.getItem('clienteLogado');
        if (!usuarioData) {
          Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
          return;
        }
        const cliente = JSON.parse(usuarioData);

        await api.post('/agendamentos', {
          dataHora: horario,
          servico: servico,
          valor: valor || 0,
          cliente: { id: cliente.id }
        });

        console.log("Agendamento salvo com sucesso no MySQL!");
      } catch (error) {
        console.error("Erro ao salvar agendamento:", error.response?.data);
        Alert.alert("Erro", "Não foi possível salvar seu agendamento no banco.");
      }
    };
    salvarNoBanco();
  }, []);

  const abrirWhatsApp = () => {
    const mensagem = `Olá! Tenho uma dúvida sobre meu agendamento (${servico} às ${horario})`;
    const url = `https://wa.me/5521969412331?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Agendado!</Text>

      <View style={styles.card}>
        <Text style={styles.servico}>{servico}</Text>
        <Text style={styles.horario}>{horario}</Text>
        {valor && <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>}
      </View>

      <TouchableOpacity onPress={abrirWhatsApp} style={styles.btnWhats}>
        <Text style={styles.btnText}>Falar com suporte (WhatsApp)</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Cliente')}>
        <Text style={styles.voltar}>Voltar para o Início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { color: '#4ADE80', fontSize: width < 400 ? 20 : 26, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#1E293B', padding: width < 400 ? 14 : 20, borderRadius: 12, marginTop: 10, width: '90%', maxWidth: 400, alignItems: 'center' },
  servico: { color: '#fff', fontSize: width < 400 ? 16 : 18, fontWeight: 'bold' },
  horario: { color: '#aaa', marginTop: 5, fontSize: width < 400 ? 14 : 16 },
  valor: { color: '#fff', marginTop: 5, fontSize: width < 400 ? 14 : 16 },
  btnWhats: { backgroundColor: '#25D366', padding: width < 400 ? 12 : 15, borderRadius: 10, marginTop: 30, width: '90%', maxWidth: 400 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: width < 400 ? 14 : 16 },
  voltar: { color: '#0A84FF', marginTop: 25, fontSize: width < 400 ? 14 : 16 }
});
