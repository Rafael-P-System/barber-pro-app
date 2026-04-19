import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import api from '../services/api';          // ✅ se precisar backend

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  title: { 
    color: '#fff', 
    fontSize: width < 400 ? 18 : 24, 
    marginTop: 15, 
    fontWeight: 'bold' 
  },
  label: { 
    color: '#fff', 
    marginTop: 25, 
    fontSize: width < 400 ? 14 : 16 
  },
  card: { 
    backgroundColor: '#1E293B', 
    padding: width < 400 ? 10 : 15, 
    borderRadius: 12, 
    marginRight: 10, 
    minWidth: width < 400 ? 110 : 150, 
    alignItems: 'center' 
  },
  cardActive: { backgroundColor: '#0A84FF', borderWidth: 2, borderColor: '#fff' },
  icon: { 
    width: width < 400 ? 30 : 50, 
    height: width < 400 ? 30 : 50, 
    marginBottom: 8 
  },
  cardText: { color: '#fff', fontWeight: 'bold', fontSize: width < 400 ? 12 : 14 },
  cardPrice: { color: '#94A3B8', marginTop: 4, fontSize: width < 400 ? 12 : 14 },
  hourBtn: { 
    padding: width < 400 ? 10 : 14, 
    backgroundColor: '#1E293B', 
    borderRadius: 10, 
    marginBottom: 8 
  },
  hourOcupado: { opacity: 0.3 },
  hourSelected: { backgroundColor: '#0A84FF' },
  btnSalvar: { 
    backgroundColor: '#0A84FF', 
    padding: width < 400 ? 14 : 18, 
    borderRadius: 12, 
    marginTop: 20 
  },
  btnText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: width < 400 ? 14 : 16 
  }
});
