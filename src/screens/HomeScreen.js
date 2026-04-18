import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Alert, ActivityIndicator, Image, StyleSheet } from 'react-native';

const BASE_URL = 'http://192.168.10.11:8080/agendamento'; 

export default function HomeScreen({ navigation, route }) {
  const nome = route?.params?.nome || 'Cliente';
  const [servico, setServico] = useState(null);
  const [horario, setHorario] = useState(null);
  const [fila, setFila] = useState([]);
  const [carregando, setCarregando] = useState(false);

  // ✅ CORREÇÃO: Ícone apenas com o require (caminho ajustado para um nível)
  const servicos = [
    { nome: 'Corte', valor: 30, icon: require('../assets/logo.png') },
    { nome: 'Barba', valor: 20, icon: require('../assets/logo.png') },
    { nome: 'Corte + Barba', valor: 50, icon: require('../assets/logo.png') },
    { nome: 'Sobrancelha', valor: 15, icon: require('../assets/logo.png') },
    { nome: 'Combo Premium', valor: 70, icon: require('../assets/logo.png') }
  ];

  const gerarHorarios = () => {
    let lista = [];
    for (let h = 8; h <= 19; h++) {
      lista.push(`${h.toString().padStart(2, '0')}:00`);
      if (h !== 19) lista.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return lista;
  };

  const horarios = gerarHorarios();

  useEffect(() => {
    carregarFila();
  }, []);

  const carregarFila = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setFila(data);
    } catch (error) {
      console.error("Erro ao carregar fila:", error);
    }
  };

  const salvar = async () => {
    if (!servico || !horario) {
      Alert.alert('Atenção', 'Escolha serviço e horário');
      return;
    }
    setCarregando(true);
    const dataHoje = new Date().toISOString().split('T')[0];
    const novoAgendamento = {
      servico: servico.nome,
      valor: servico.valor,
      dataHora: `${dataHoje}T${horario}:00`,
      barbeiroId: 1,
      cliente: { id: 1 }
    };

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoAgendamento)
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Agendamento realizado!');
        navigation.navigate('Cliente');
      } else {
        Alert.alert('Erro', 'Horário ocupado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Conexão falhou.');
    } finally {
      setCarregando(false);
      carregarFila();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 40 }}>
        <Text style={{ color: '#0A84FF', fontWeight: 'bold' }}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Olá, {nome}</Text>

      <Text style={styles.label}>Escolha o Serviço</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
        {servicos.map((s, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setServico(s)}
            style={[styles.card, servico?.nome === s.nome && styles.cardActive]}
          >
            {/* ✅ IMAGEM RENDERIZADA AQUI */}
            <Image source={s.icon} style={styles.icon} resizeMode="contain" />
            <Text style={styles.cardText}>{s.nome}</Text>
            <Text style={styles.cardPrice}>R$ {s.valor}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.label}>Horários Disponíveis</Text>
      <View style={{ marginTop: 10 }}>
        {horarios.map((h, i) => {
          const selecionado = horario === h;
          const ocupado = fila.some(item => item.dataHora.includes(h));
          return (
            <TouchableOpacity
              key={i}
              disabled={ocupado}
              onPress={() => setHorario(h)}
              style={[styles.hourBtn, ocupado && styles.hourOcupado, selecionado && styles.hourSelected]}
            >
              <Text style={{ color: '#fff', textAlign: 'center' }}>
                {h} {ocupado ? '(Ocupado)' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity onPress={salvar} disabled={carregando} style={styles.btnSalvar}>
        {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Confirmar Agendamento</Text>}
      </TouchableOpacity>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  title: { color: '#fff', fontSize: 22, marginTop: 15, fontWeight: 'bold' },
  label: { color: '#fff', marginTop: 25, fontSize: 16 },
  card: { backgroundColor: '#1E293B', padding: 15, borderRadius: 12, marginRight: 10, minWidth: 130, alignItems: 'center' },
  cardActive: { backgroundColor: '#0A84FF', borderWidth: 2, borderColor: '#fff' },
  icon: { width: 40, height: 40, marginBottom: 8 },
  cardText: { color: '#fff', fontWeight: 'bold' },
  cardPrice: { color: '#94A3B8', marginTop: 4 },
  hourBtn: { padding: 14, backgroundColor: '#1E293B', borderRadius: 10, marginBottom: 8 },
  hourOcupado: { opacity: 0.3 },
  hourSelected: { backgroundColor: '#0A84FF' },
  btnSalvar: { backgroundColor: '#0A84FF', padding: 18, borderRadius: 12, marginTop: 20 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});