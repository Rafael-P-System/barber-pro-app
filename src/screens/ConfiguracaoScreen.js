import { StyleSheet, Dimensions } from 'react-native';
import api from '../services/api';              // se precisar salvar configs
import logo from '../assets/logo.png';          // se usar logo

const { width } = Dimensions.get('window');

export default function ConfiguracaoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configurações</Text>
      {/* Aqui você pode adicionar opções de configuração */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  header: {
    color: '#fff',
    fontSize: width < 400 ? 22 : 28,
    fontWeight: 'bold',
    marginTop: 40,
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
    color: '#94A3B8',
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
    borderBottomColor: '#334155'
  },
  itemText: {
    color: '#fff',
    fontSize: width < 400 ? 14 : 16
  },
  arrow: { color: '#94A3B8', fontSize: width < 400 ? 18 : 20 },
  version: {
    color: '#475569',
    textAlign: 'center',
    marginTop: 20,
    fontSize: width < 400 ? 11 : 12
  }
});
