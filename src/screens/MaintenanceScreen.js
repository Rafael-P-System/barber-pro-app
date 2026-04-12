import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function MaintenanceScreen() {
  return (
    <View style={styles.container}>
      {/* Você pode usar um ícone de engrenagem ou ferramenta aqui */}
      <Text style={styles.icon}>⚙️</Text>
      <Text style={styles.title}>Estamos em manutenção</Text>
      <Text style={styles.message}>
        Estamos atualizando nosso sistema para oferecer uma experiência ainda melhor. 
        Por favor, tente novamente em alguns instantes.
      </Text>
      <Text style={styles.footer}>Agradecemos a compreensão!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  icon: { fontSize: 80, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  message: { fontSize: 16, textAlign: 'center', color: '#666', lineHeight: 24 },
  footer: { marginTop: 30, fontSize: 14, color: '#999', fontStyle: 'italic' }
});