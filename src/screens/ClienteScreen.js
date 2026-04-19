import React from 'react';
import { View, Text } from 'react-native';
import api from '../services/api';          // ✅ se precisar backend
import logo from '../assets/logo.png';      // ✅ se usar logo
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { 
    paddingTop: 60, 
    paddingHorizontal: 25, 
    paddingBottom: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  welcome: { color: '#94A3B8', fontSize: width < 400 ? 14 : 16 },
  title: { color: '#fff', fontSize: width < 400 ? 18 : 22, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: 'rgba(248, 113, 113, 0.1)', padding: 8, borderRadius: 8 },
  logoutText: { color: '#f87171', fontWeight: 'bold' },
  
  content: { flex: 1, paddingHorizontal: 25 },
  
  mainCard: { 
    backgroundColor: '#3B82F6', 
    borderRadius: 20, 
    padding: width < 400 ? 18 : 25, 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 30,
    elevation: 8,
    shadowColor: '#3B82F6',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center'
  },
  mainCardInfo: { flex: 1 },
  mainCardTitle: { color: '#fff', fontSize: width < 400 ? 16 : 20, fontWeight: 'bold' },
  mainCardSub: { color: 'rgba(255, 255, 255, 0.8)', fontSize: width < 400 ? 12 : 13, marginTop: 5 },
  mainCardIcon: { fontSize: width < 400 ? 30 : 40 },

  sectionTitle: { color: '#fff', fontSize: width < 400 ? 16 : 18, fontWeight: 'bold', marginBottom: 15 },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 30 },
  categoryCard: { 
    backgroundColor: '#1E293B', 
    width: '47%', 
    maxWidth: 220, 
    padding: width < 400 ? 14 : 20, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155'
  },
  categoryIcon: { fontSize: width < 400 ? 20 : 24, marginBottom: 8 },
  categoryName: { color: '#fff', fontWeight: '600', fontSize: width < 400 ? 13 : 14 },

  historyCard: { 
    backgroundColor: '#1E293B', 
    borderRadius: 20, 
    padding: width < 400 ? 14 : 20, 
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#334155',
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center'
  },
  historyTitle: { color: '#fff', fontSize: width < 400 ? 14 : 16, fontWeight: 'bold', marginBottom: 15 },
  emptyState: { padding: 20, alignItems: 'center' },
  emptyStateText: { color: '#64748B', textAlign: 'center', fontSize: width < 400 ? 12 : 14 }
});
