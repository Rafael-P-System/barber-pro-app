import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function MaintenanceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
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
    backgroundColor: '#0F172A' 
  },
  iconCircle: {
    width: width < 400 ? 90 : 120,
    height: width < 400 ? 90 : 120,
    borderRadius: width < 400 ? 45 : 60,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#334155'
  },
  icon: { fontSize: width < 400 ? 40 : 60 },
  title: { 
    fontSize: width < 400 ? 20 : 26, 
    fontWeight: 'bold', 
    color: '#F8FAFC', 
    marginBottom: 20,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#1E293B',
    padding: width < 400 ? 14 : 20,
    borderRadius: 15,
    width: '100%',
    maxWidth: 500,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6'
  },
  message: { 
    fontSize: width < 400 ? 14 : 16, 
    textAlign: 'left', 
    color: '#94A3B8', 
    lineHeight: 22 
  },
  highlight: {
    color: '#3B82F6',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: width < 400 ? 12 : 14
  },
  button: {
    marginTop: 40,
    backgroundColor: '#3B82F6',
    paddingVertical: width < 400 ? 12 : 15,
    paddingHorizontal: width < 400 ? 30 : 40,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width < 400 ? 14 : 16
  },
  footer: { 
    position: 'absolute',
    bottom: 30,
    fontSize: width < 400 ? 11 : 12, 
    color: '#475569', 
    letterSpacing: 1
  }
});
