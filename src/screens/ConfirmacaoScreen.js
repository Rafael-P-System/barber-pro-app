import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function ConfirmacaoScreen({ route, navigation }) {
  const { servico, horario, valor } = route.params;

  useEffect(() => {
    const salvarNoBanco = async () => {
      try {
        // Recupera o cliente que logou no início
        const usuarioData = await AsyncStorage.getItem('clienteLogado');
        if (!usuarioData) {
          Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
          return;
        }

        const cliente = JSON.parse(usuarioData);

        // Envia para o AgendamentoController do Java
        await api.post('/agendamentos', {
          dataHora: horario, // Certifique-se que vem como "YYYY-MM-DDTHH:MM:SS"
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
    <View style={{ flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      
      <Text style={{ color: '#4ADE80', fontSize: 24, fontWeight: 'bold' }}>
        ✅ Agendado!
      </Text>

      <View style={{ backgroundColor: '#1E293B', padding: 20, borderRadius: 12, marginTop: 20, width: '100%', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{servico}</Text>
        <Text style={{ color: '#aaa', marginTop: 5 }}>{horario}</Text>
        {valor && <Text style={{ color: '#fff', marginTop: 5 }}>R$ {valor.toFixed(2)}</Text>}
      </View>

      <TouchableOpacity
        onPress={abrirWhatsApp}
        style={{ backgroundColor: '#25D366', padding: 15, borderRadius: 10, marginTop: 30, width: '100%' }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Falar com suporte (WhatsApp)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Cliente')}>
        <Text style={{ color: '#0A84FF', marginTop: 25, fontSize: 16 }}>
          Voltar para o Início
        </Text>
      </TouchableOpacity>

    </View>
  );
}