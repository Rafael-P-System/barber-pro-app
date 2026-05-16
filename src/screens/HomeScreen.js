import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Platform,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function HomeScreen({ navigation }) {
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  const [servicos] = useState([
    { id: 1, nome: 'Corte', preco: '30,00' },
    { id: 2, nome: 'Barba', preco: '20,00' },
    { id: 3, nome: 'Maquina e Tesoura', preco: '70,00' },
    { id: 4, nome: 'Maquina', preco: '30,00' },
    { id: 5, nome: 'Sobrancelha', preco: '20,00' },
    { id: 6, nome: 'Combo', preco: '70,00' },
  ]);

  // 🔥 GERA HORÁRIOS AUTOMATICAMENTE ATÉ 19:00
  const gerarHorarios = () => {
    const lista = [];
    let hora = 8;
    let minuto = 0;
    let id = 1;

    while (hora < 19 || (hora === 19 && minuto === 0)) {
      const horaFormatada = `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`;

      lista.push({
        id: id++,
        hora: horaFormatada,
        ocupado: false, // depois vem da API
        meuAgendamento: false
      });

      minuto += 40;

      if (minuto >= 60) {
        hora += 1;
        minuto -= 60;
      }
    }

    return lista;
  };

  const [horarios, setHorarios] = useState(gerarHorarios());

  const cancelarMeuAgendamento = (id) => {
    const novos = horarios.map(h => {
      if (h.id === id) {
        return { ...h, ocupado: false, meuAgendamento: false };
      }
      return h;
    });
    setHorarios(novos);
    setHorarioSelecionado(null);
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* BOTÃO VOLTAR */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVoltar}>
          <Text style={{ color: '#FFD700', fontSize: 16, fontWeight: 'bold' }}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Serviços disponíveis</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollServicos}>
          {servicos.map((item) => {
            const isSelected = servicoSelecionado === item.id;
            return (
              <TouchableOpacity 
                key={item.id}
                style={[
                  styles.card, 
                  isSelected && styles.cardSelecionado
                ]}
                onPress={() => setServicoSelecionado(item.id)}
              >
                <Image source={require('../assets/logo.png')} style={styles.icon} />
                {/* 🔥 CORREÇÃO: Texto fica preto se o card for selecionado (melhorando o contraste) */}
                <Text style={[styles.cardText, isSelected && { color: '#000' }]}>{item.nome}</Text>
                <Text style={[styles.cardPrice, isSelected && { color: '#333' }]}>R$ {item.preco}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.label}>Horários para hoje:</Text>

        <View style={{ maxHeight: 120 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollHorarios}>
            {horarios.map((item) => {
              const isHoraSelecionada = horarioSelecionado?.id === item.id;
              return (
                <View key={item.id} style={styles.containerHorario}>

                  <TouchableOpacity 
                    disabled={item.ocupado && !item.meuAgendamento}
                    style={[
                      styles.btnHora,
                      isHoraSelecionada && styles.horarioSelecionado,
                      item.ocupado && !item.meuAgendamento && styles.btnOcupado,
                      item.meuAgendamento && styles.meuHorario
                    ]}
                    onPress={() => {
                      if (!item.ocupado) {
                        setHorarioSelecionado(item);
                      }
                    }}
                  >
                    {/* 🔥 CORREÇÃO: Texto do horário fica preto ao ser selecionado */}
                    <Text style={[
                      styles.cardText,
                      isHoraSelecionada && { color: '#000' },
                      item.ocupado && !item.meuAgendamento && { color: '#AAA' }
                    ]}>
                      {item.hora}
                    </Text>
                  </TouchableOpacity>

                  {item.meuAgendamento && (
                    <TouchableOpacity 
                      style={styles.btnCancelar}
                      onPress={() => cancelarMeuAgendamento(item.id)}
                    >
                      <Text style={styles.btnCancelarText}>Cancelar</Text>
                    </TouchableOpacity>
                  )}

                </View>
              );
            })}
          </ScrollView>
        </View>

        <TouchableOpacity 
          style={[
            styles.btnSalvar, 
            (!servicoSelecionado || !horarioSelecionado) && { opacity: 0.5 }
          ]}
          disabled={!servicoSelecionado || !horarioSelecionado}
          onPress={() => navigation.navigate('Confirmacao', { 
            servico: servicoSelecionado, 
            horario: horarioSelecionado 
          })}
        >
          <Text style={styles.btnText}>Confirmar Agendamento</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },

  btnVoltar: {
    marginTop: Platform.OS === 'ios' ? 0 : 15,
    marginBottom: 10,
    alignSelf: 'flex-start'
  },

  title: { 
    color: '#FFD700', 
    fontSize: width < 400 ? 22 : isWeb ? 32 : 28, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 10
  },

  label: { 
    color: '#FFF', 
    marginTop: 25, 
    fontSize: width < 400 ? 16 : isWeb ? 20 : 18, 
    fontWeight: 'bold' 
  },

  scrollServicos: { maxHeight: 140, marginTop: 10 },

  card: { 
    backgroundColor: '#1E293B', 
    padding: 15, 
    borderRadius: 12, 
    marginRight: 10, 
    minWidth: 130, 
    alignItems: 'center', 
    height: 120 
  },

  cardSelecionado: { backgroundColor: '#FFD700' },

  icon: { width: 40, height: 40, marginBottom: 8 },

  cardText: { color: '#FFF', fontWeight: 'bold' },

  cardPrice: { color: '#94A3B8', marginTop: 4 },

  scrollHorarios: { marginTop: 15 },

  containerHorario: { alignItems: 'center', marginRight: 15 },

  btnHora: { 
    backgroundColor: '#1E293B', 
    padding: 15, 
    borderRadius: 10, 
    minWidth: 80, 
    alignItems: 'center' 
  },

  horarioSelecionado: {
    backgroundColor: '#FFD700'
  },

  meuHorario: {
    backgroundColor: '#22C55E'
  },

  btnOcupado: { 
    backgroundColor: '#475569', 
    opacity: 0.4 
  },

  btnCancelar: { 
    backgroundColor: '#FF3B30', 
    padding: 8, 
    borderRadius: 5, 
    marginTop: 5, 
    width: '100%' 
  },

  btnCancelarText: { 
    color: '#FFF', 
    fontSize: 10, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },

  btnSalvar: { 
    backgroundColor: '#0A84FF', 
    padding: 18, 
    borderRadius: 12, 
    marginTop: 'auto', 
    marginBottom: Platform.OS === 'ios' ? 0 : 20 
  },

  btnText: { 
    color: '#FFF', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});