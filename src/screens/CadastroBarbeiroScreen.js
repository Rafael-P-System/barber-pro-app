import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Alert, 
  Platform,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function BarberScreen({ navigation }) {
  const finalizarTurno = () => {
    Alert.alert("Turno finalizado", "Você encerrou o expediente com sucesso.");
    // 🔥 CORREÇÃO: Mudado de replace para navigate para evitar travamentos
    navigation.navigate('Login');
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      {/* SafeAreaView evita que o conteúdo morda a barra de status do celular */}
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.header}>
            <Text style={styles.titulo}>Área do Barbeiro</Text>

            {/* 🔥 CORREÇÃO: Mudado de replace para navigate no botão Sair */}
            <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate('Login')}>
              <Icon name="logout" size={18} color="#FFF" style={{ marginRight: 4 }} />
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitulo}>Resumo de Hoje</Text>
          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Cortes</Text>
              <Text style={styles.cardValue}>12</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Barbas</Text>
              <Text style={styles.cardValue}>8</Text>
            </View>
          </View>

          <Text style={styles.subtitulo}>Agendamentos</Text>
          
          {/* Item de exemplo - Futuramente mapeado com os dados da API */}
          <View style={styles.itemAgendamento}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Pedro Santos</Text>
              <Text style={{ color: '#94A3B8', fontSize: 14 }}>Serviço: Corte tradicional</Text>
            </View>
            <TouchableOpacity style={styles.btnDelete} onPress={() => Alert.alert("Agendamento removido")}>
              <Icon name="trash-can-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnStatus} onPress={finalizarTurno}>
            <Text style={styles.btnText}>Finalizar Turno</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20, flexGrow: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20, 
    marginTop: Platform.OS === 'ios' ? 0 : 20 
  },
  titulo: { 
    color: '#FFD700', 
    fontSize: width < 400 ? 20 : isWeb ? 28 : 24, 
    fontWeight: 'bold' 
  },
  logoutBtn: { 
    backgroundColor: '#EF4444', 
    paddingVertical: width < 400 ? 6 : 8,
    paddingHorizontal: width < 400 ? 10 : 12, 
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  logoutText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: width < 400 ? 14 : isWeb ? 16 : 15 
  },
  subtitulo: { 
    color: '#FFF', 
    fontSize: width < 400 ? 16 : isWeb ? 20 : 18, 
    marginVertical: 15, 
    fontWeight: 'bold' 
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: 500, alignSelf: 'center' },
  card: { 
    backgroundColor: '#1E293B', 
    padding: width < 400 ? 12 : 15, 
    borderRadius: 12, 
    width: '48%'
  },
  cardLabel: { color: '#94A3B8', fontSize: width < 400 ? 12 : 14 },
  cardValue: { color: '#FFF', fontSize: width < 400 ? 16 : 18, fontWeight: 'bold', marginTop: 4 },
  btnStatus: { 
    backgroundColor: '#FFD700', 
    padding: width < 400 ? 12 : 15, 
    borderRadius: 10, 
    marginTop: 30, 
    width: '100%', 
    maxWidth: 500, 
    alignSelf: 'center' 
  },
  btnText: { 
    color: '#000', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16 
  },
  itemAgendamento: { 
    backgroundColor: '#1E293B', 
    padding: width < 400 ? 12 : 15, 
    borderRadius: 10, 
    marginBottom: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '100%', 
    maxWidth: 500, 
    alignSelf: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700'
  },
  btnDelete: { 
    backgroundColor: '#EF4444', 
    padding: width < 400 ? 8 : 10, 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
});