import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

export default function MaintenanceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Círculo de destaque para o ícone */}
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>🛠️</Text>
      </View>

      <Text style={styles.title}>Sistema em Atualização</Text>
      
      <View style={styles.card}>
        <Text style={styles.message}>
          Estamos aprimorando nossas ferramentas para garantir que sua barbearia tenha a melhor gestão do mercado.
        </Text>
        
        <Text style={styles.highlight}>
          Previsão de retorno: em alguns instantes.
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.replace('LoginScreen')}
      >
        <Text style={styles.buttonText}>Verificar Novamente</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Rafael Silva • Tecnologia para Barbearias</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 30, 
    backgroundColor: '#0F172A' // Dark Navy Blue
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#334155'
  },
  icon: { fontSize: 60 },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#F8FAFC', 
    marginBottom: 20,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6' // Azul de destaque
  },
  message: { 
    fontSize: 16, 
    textAlign: 'left', 
    color: '#94A3B8', 
    lineHeight: 24 
  },
  highlight: {
    color: '#3B82F6',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 14
  },
  button: {
    marginTop: 40,
    backgroundColor: '#3B82F6',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  footer: { 
    position: 'absolute',
    bottom: 30,
    fontSize: 12, 
    color: '#475569', 
    letterSpacing: 1
  }
});