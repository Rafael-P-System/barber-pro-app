import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Platform, 
  TouchableOpacity 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function ConfiguracaoScreen() {
  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Configurações</Text>

        {/* SEÇÃO: CONTA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          
          <TouchableOpacity style={styles.item} activeOpacity={0.7}>
            <Text style={styles.itemText}>Alterar Senha</Text>
            <Icon name="chevron-right" size={22} color="#FFD700" />
          </TouchableOpacity>
          
          {/* 🔥 ÚLTIMO ITEM: Ganha o estilo 'noBorder' para não quebrar o visual */}
          <TouchableOpacity style={[styles.item, styles.noBorder]} activeOpacity={0.7}>
            <Text style={styles.itemText}>Excluir Conta</Text>
            <Icon name="chevron-right" size={22} color="#FFD700" />
          </TouchableOpacity>
        </View>

        {/* SEÇÃO: SISTEMA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sistema</Text>
          
          <TouchableOpacity style={styles.item} activeOpacity={0.7}>
            <Text style={styles.itemText}>Notificações</Text>
            <Icon name="chevron-right" size={22} color="#FFD700" />
          </TouchableOpacity>
          
          {/* 🔥 ÚLTIMO ITEM: Sem borda inferior */}
          <TouchableOpacity style={[styles.item, styles.noBorder]} activeOpacity={0.7}>
            <Text style={styles.itemText}>Tema</Text>
            <Icon name="chevron-right" size={22} color="#FFD700" />
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>Versão 1.0.0</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: 'rgba(26,26,26,0.9)',
    padding: width < 400 ? 20 : width * 0.08,
    borderRadius: 20,
    width: isWeb ? (width > 800 ? 500 : 420) : width * 0.9,
    alignItems: 'center'
  },
  header: {
    color: '#FFD700',
    fontSize: width < 400 ? 22 : isWeb ? 32 : 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center'
  },
  section: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: width < 400 ? 8 : 14,
    marginBottom: 20,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center'
  },
  sectionTitle: {
    color: '#FFD700',
    fontSize: width < 400 ? 12 : 14,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
    textTransform: 'uppercase'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width < 400 ? 12 : 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#444'
  },
  noBorder: {
    borderBottomWidth: 0 // Remove a linha do último elemento para ficar limpo dentro do card
  },
  itemText: {
    color: '#FFF',
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16
  },
  version: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    fontSize: width < 400 ? 11 : 12
  }
});