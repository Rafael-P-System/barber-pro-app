import React from 'react';
import { View, Text } from 'react-native';
import api from '../services/api';          // ✅ se precisar backend

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 20 },
  titulo: { color: '#fff', fontSize: width < 400 ? 18 : 22, fontWeight: 'bold' },
  subtitulo: { color: '#fff', fontSize: width < 400 ? 16 : 18, marginVertical: 15, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  card: { 
    backgroundColor: '#1E293B', 
    padding: width < 400 ? 12 : 15, 
    borderRadius: 12, 
    width: '48%', 
    maxWidth: 220 
  },
  cardLabel: { color: '#94A3B8', fontSize: width < 400 ? 11 : 12 },
  cardValue: { color: '#fff', fontSize: width < 400 ? 16 : 18, fontWeight: 'bold' },
  grafico: { marginVertical: 15, borderRadius: 16 },
  btnStatus: { 
    padding: width < 400 ? 12 : 15, 
    borderRadius: 10, 
    marginVertical: 10, 
    width: '100%', 
    maxWidth: 400, 
    alignSelf: 'center' 
  },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: width < 400 ? 14 : 16 },
  itemAgendamento: { 
    backgroundColor: '#1E293B', 
    padding: width < 400 ? 12 : 15, 
    borderRadius: 10, 
    marginBottom: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '100%', 
    maxWidth: 500, 
    alignSelf: 'center' 
  },
  btnDelete: { backgroundColor: '#ef4444', padding: width < 400 ? 8 : 10, borderRadius: 8 }
});
