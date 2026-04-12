import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Alert, ActivityIndicator } from 'react-native';

// ❗ IMPORTANTE: Substitua pelo seu IP real (o que você viu no ipconfig)
const BASE_URL = 'http://192.168.10.11:8080/agendamento'; 

export default function HomeScreen({ navigation, route }) {
  const nome = route?.params?.nome || 'Cliente';

  const [servico, setServico] = useState(null);
  const [horario, setHorario] = useState(null);
  const [fila, setFila] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const servicos = [
    { nome: 'Corte', valor: 30 },
    { nome: 'Barba', valor: 20 },
    { nome: 'Corte + Barba', valor: 50 },
    { nome: 'Sobrancelha', valor: 15 },
    { nome: 'Combo Premium', valor: 70 }
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
    const unsubscribe = navigation.addListener('focus', () => {
      carregarFila();
    });
    return unsubscribe;
  }, [navigation]);

  // 📡 BUSCAR AGENDAMENTOS DO JAVA (GET)
  const carregarFila = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      
      // Ordenação simples por horário
      const listaOrdenada = data.sort((a, b) => a.dataHora.localeCompare(b.dataHora));
      setFila(listaOrdenada);
    } catch (error) {
      console.error("Erro ao carregar fila do Java:", error);
    }
  };

  // 💾 SALVAR AGENDAMENTO NO JAVA (POST)
  const salvar = async () => {
    if (!servico || !horario) {
      Alert.alert('Atenção', 'Escolha serviço e horário');
      return;
    }

    setCarregando(true);

    // Formata a data para LocalDateTime (yyyy-MM-ddTHH:mm:ss)
    const dataHoje = new Date().toISOString().split('T')[0];
    const dataHoraISO = `${dataHoje}T${horario}:00`;

    const novoAgendamento = {
      servico: servico.nome,
      valor: servico.valor,
      dataHora: dataHoraISO,
      barbeiroId: 1, // ID padrão para o teste
      cliente: { id: 1 } // Certifique-se que existe um cliente ID 1 no seu MySQL
    };

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoAgendamento)
      });

      if (response.ok) {
        const salvo = await response.json();
        Alert.alert('Sucesso', 'Agendamento realizado com sucesso!');
        navigation.navigate('Confirmacao', salvo);
      } else if (response.status === 409) {
        Alert.alert('Horário Ocupado', 'Este horário já foi reservado por outro cliente.');
      } else {
        const erroMsg = await response.text();
        Alert.alert('Erro', 'Erro ao salvar: ' + erroMsg);
      }
    } catch (error) {
      console.error("Erro na conexão:", error);
      Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor Java.');
    } finally {
      setCarregando(false);
      carregarFila();
    }
  };

  const suporte = () => {
    Linking.openURL("https://wa.me/5521969412331");
  };

  // Lógica de posição (considerando que o objeto retornado tenha o nome do cliente)
  const posicaoCliente = fila.findIndex(item => item.cliente?.id === 1); // Exemplo por ID
  const tempoEstimado = posicaoCliente !== -1 ? posicaoCliente * 30 : 0;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0F172A', padding: 20 }}>

      <TouchableOpacity onPress={() => navigation.navigate('Cliente')}>
        <Text style={{ color: '#0A84FF', fontWeight: 'bold' }}>Voltar</Text>
      </TouchableOpacity>

      <Text style={{ color: '#fff', fontSize: 22, marginTop: 15, fontWeight: 'bold' }}>
        Olá, {nome}
      </Text>

      {/* SERVIÇOS */}
      <Text style={{ color: '#fff', marginTop: 20, fontSize: 16 }}>Escolha o Serviço</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
        {servicos.map((s, i) => {
          const selecionado = servico?.nome === s.nome;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => setServico(s)}
              style={{
                backgroundColor: selecionado ? '#0A84FF' : '#1E293B',
                padding: 15,
                borderRadius: 12,
                marginRight: 10,
                minWidth: 130,
                borderWidth: selecionado ? 2 : 0,
                borderColor: '#fff'
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>{s.nome}</Text>
              <Text style={{ color: '#94A3B8', marginTop: 4 }}>R$ {s.valor}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* HORÁRIOS */}
      <Text style={{ color: '#fff', marginTop: 25, fontSize: 16 }}>Horários Disponíveis</Text>
      <View style={{ marginTop: 10 }}>
        {horarios.map((h, i) => {
          const selecionado = horario === h;
          const dataHojeStr = new Date().toISOString().split('T')[0];
          
          // Verifica no array 'fila' que veio do Java se o horário está ocupado
          const ocupado = fila.some(item => 
            item.dataHora.includes(`${dataHojeStr}T${h}`)
          );

          return (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <TouchableOpacity
                disabled={ocupado}
                onPress={() => setHorario(h)}
                style={{
                  flex: 1,
                  padding: 14,
                  backgroundColor: ocupado ? '#334155' : selecionado ? '#0A84FF' : '#1E293B',
                  borderRadius: 10
                }}
              >
                <Text style={{ color: ocupado ? '#64748B' : '#fff', textAlign: 'center', fontWeight: '500' }}>
                  {h} {ocupado ? '(Ocupado)' : ''}
                </Text>
              </TouchableOpacity>

              {selecionado && !ocupado && (
                <TouchableOpacity
                  onPress={() => setHorario(null)}
                  style={{ backgroundColor: '#EF4444', padding: 14, borderRadius: 10, marginLeft: 8 }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>X</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>

      {/* STATUS DA FILA */}
      {posicaoCliente !== -1 && (
        <View style={{ marginTop: 20, backgroundColor: '#1E293B', padding: 15, borderRadius: 10 }}>
          <Text style={{ color: '#fff' }}>Sua posição na fila: <Text style={{fontWeight:'bold'}}>#{posicaoCliente + 1}</Text></Text>
          <Text style={{ color: '#F59E0B', marginTop: 5 }}>Tempo estimado: ~{tempoEstimado} min</Text>
        </View>
      )}

      {/* BOTÃO CONFIRMAR */}
      <TouchableOpacity
        onPress={salvar}
        disabled={carregando}
        style={{
          backgroundColor: '#0A84FF',
          padding: 18,
          borderRadius: 12,
          marginTop: 30,
          opacity: carregando ? 0.6 : 1
        }}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
            Confirmar Agendamento
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={suporte} style={{ marginBottom: 40 }}>
        <Text style={{ color: '#22C55E', marginTop: 25, textAlign: 'center' }}>
          Precisa de ajuda? Chame no WhatsApp
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}