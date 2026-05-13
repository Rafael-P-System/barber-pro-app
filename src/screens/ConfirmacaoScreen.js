import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Linking, 
  Alert, 
  StyleSheet, 
  Dimensions, 
  Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function ConfirmacaoScreen({ route, navigation }) {

  const { servico, horario } = route.params;

  useEffect(() => {
    const salvarNoBanco = async () => {
      try {
        const usuarioData = await AsyncStorage.getItem('clienteLogado');
        if (!usuarioData) {
          Alert.alert("Erro", "Usuário não identificado.");
          return;
        }

        const cliente = JSON.parse(usuarioData);

        // 🔥 separa hora (ex: "08:40")
        const hora = horario.hora;

        await api.post('/agendamentos/agendar', {
          data: new Date().toISOString().split('T')[0], // yyyy-MM-dd
          hora: hora,
          status: "AGENDADO",

          cliente: { id: cliente.id },

          // ⚠️ AJUSTA ISSO AQUI
          barbeiro: { id: 1 }, // depois vamos pegar dinamico
          servico: { id: servico }
        });

        console.log("✅ Agendamento salvo no banco!");

      } catch (error) {
        console.error("❌ Erro:", error.response?.data || error.message);
        Alert.alert("Erro", "Falha ao salvar agendamento.");
      }
    };

    salvarNoBanco();
  }, []);

  const abrirWhatsApp = () => {
    const mensagem = `Olá! Tenho uma dúvida sobre meu agendamento (${servico} às ${horario.hora})`;
    const url = `https://wa.me/5521969412331?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <Text style={styles.title}>✅ Agendado!</Text>

      <View style={styles.card}>
        <Text style={styles.servico}>Serviço ID: {servico}</Text>
        <Text style={styles.horario}>{horario.hora}</Text>
      </View>

      <TouchableOpacity onPress={abrirWhatsApp} style={styles.btnWhats}>
        <Icon name="whatsapp" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.btnText}>Falar no WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.replace('Cliente')} 
        style={styles.btnVoltar}
      >
        <Text style={styles.voltarText}>Voltar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },

  title: { 
    color: '#4ADE80', 
    fontSize: width < 400 ? 20 : isWeb ? 28 : 26, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },

  card: { 
    backgroundColor: '#1E293B', 
    padding: 20, 
    borderRadius: 12, 
    width: '90%', 
    alignItems: 'center' 
  },

  servico: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  horario: { color: '#aaa', marginTop: 5 },

  btnWhats: { 
    flexDirection: 'row',
    backgroundColor: '#25D366', 
    padding: 15, 
    borderRadius: 10, 
    marginTop: 30, 
    width: '90%', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },

  btnText: { color: '#fff', fontWeight: 'bold' },

  btnVoltar: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#0A84FF',
    width: '90%',
    alignItems: 'center'
  },

  voltarText: { color: '#fff', fontWeight: 'bold' }
});