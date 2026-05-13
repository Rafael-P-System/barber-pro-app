import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Alert, 
  Switch, 
  StatusBar, 
  Linking, 
  Dimensions, 
  Platform 
} from 'react-native';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function AdminDashboardScreen({ navigation }) {
  const [barber, setBarber] = useState([]);

  useEffect(() => {
    carregarBarber();
  }, []);

  const carregarBarber = async () => {
    try {
      const response = await api.get('/admin/barbearias');
      setBarber(response.data);
    } catch (error) {
      console.error('Erro ao carregar barbeiros:', error);
      Alert.alert('Erro', 'Não foi possível carregar as barbearias.');
    }
  };

  const toggleStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 'ATIVO' ? 'SUSPENSO' : 'ATIVO';
    try {
      await api.put(`/admin/barbearia/${id}/status`, { status: novoStatus });
      carregarBarber();
      Alert.alert('Sucesso', `Sistema ${novoStatus === 'ATIVO' ? 'Liberado' : 'Bloqueado'}!`);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      Alert.alert('Erro', 'Falha ao comunicar com o servidor.');
    }
  };

  const abrirWhatsapp = (email) => {
    const mensagem = `Olá, estamos entrando em contato sobre sua conta no Barbearia App.`;
    const url = `whatsapp://send?text=${encodeURIComponent(mensagem)}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Erro', 'WhatsApp não está instalado ou não é suportado.');
      }
    });
  };

  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle}>Gestão Master</Text>
          <Text style={styles.headerSubtitle}>Controle de Clientes SaaS</Text>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {barber.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma barbearia encontrada.</Text>
        </View>
      ) : (
        <FlatList
          data={barber}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.infoContainer}>
                <Text style={styles.nome}>{item.nome}</Text>
                
                <View style={styles.row}>
                  <Text style={styles.label}>Email: </Text>
                  <Text style={styles.vencimento}>{item.email}</Text>
                </View>
                
                <View style={[styles.statusBadge, item.status === 'ATIVO' ? styles.badgeAtivo : styles.badgeSuspenso]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.acoesContainer}>
                <View style={styles.switchBox}>
                  <Text style={styles.switchLabel}>
                    {item.status === 'ATIVO' ? 'Acesso Ativo' : 'Acesso Cortado'}
                  </Text>
                  <Switch
                    trackColor={{ false: '#334155', true: '#10B981' }}
                    thumbColor={item.status === 'ATIVO' ? '#fff' : '#94A3B8'}
                    value={item.status === 'ATIVO'}
                    onValueChange={() => toggleStatus(item.id, item.status)}
                  />
                </View>
                
                <TouchableOpacity 
                  style={styles.zapButton} 
                  onPress={() => abrirWhatsapp(item.email)}
                  activeOpacity={0.7}
                >
                  <Icon name="whatsapp" size={20} color="#000" style={{ marginRight: 6 }} />
                  <Text style={styles.zapText}>Notificar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 25,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  headerTitle: {
    fontSize: width < 400 ? 22 : isWeb ? 32 : 28,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  headerSubtitle: {
    fontSize: width < 400 ? 12 : 14,
    color: '#888',
  },
  logoutBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: width < 400 ? 8 : 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  logoutText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16,
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#444',
    width: '100%',
  },
  infoContainer: {
    marginBottom: 10,
  },
  nome: {
    fontSize: width < 400 ? 16 : isWeb ? 20 : 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    color: '#94A3B8',
    fontSize: 14,
  },
  vencimento: {
    color: '#CBD5E1',
    fontSize: 14,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 5,
  },
  badgeAtivo: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  badgeSuspenso: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 12,
  },
  acoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    color: '#94A3B8',
    marginRight: 10,
    fontSize: 13,
  },
  zapButton: {
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    paddingVertical: width < 400 ? 8 : 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  zapText: {
    color: '#000',
    fontWeight: '600',
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16,
  }
});
