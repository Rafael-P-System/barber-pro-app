import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Serviços disponíveis</Text>
      <Text style={styles.label}>Escolha um corte ou barba:</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
        <TouchableOpacity style={styles.card}>
          <Image source={require('../assets/logo.png')} style={styles.icon} />
          <Text style={styles.cardText}>Corte</Text>
          <Text style={styles.cardPrice}>R$ 30,00</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image source={require('../assets/logo.png')} style={styles.icon} />
          <Text style={styles.cardText}>Barba</Text>
          <Text style={styles.cardPrice}>R$ 20,00</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image source={require('../assets/logo.png')} style={styles.icon} />
          <Text style={styles.cardText}>Corte Máquina</Text>
          <Text style={styles.cardPrice}>R$ 20,00</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image source={require('../assets/logo.png')} style={styles.icon} />
          <Text style={styles.cardText}>Corte Tesoura</Text>
          <Text style={styles.cardPrice}>R$ 25,00</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image source={require('../assets/logo.png')} style={styles.icon} />
          <Text style={styles.cardText}>Combo</Text>
          <Text style={styles.cardPrice}>R$ 70,00</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image source={require('../assets/logo.png')} style={styles.icon} />
          <Text style={styles.cardText}>Máquina + Tesoura</Text>
          <Text style={styles.cardPrice}>R$ 25,00</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity 
        style={styles.btnSalvar}
        onPress={() => navigation.navigate('Confirmacao', { servico: 'Corte', horario: '14h', valor: 30 })}
      >
        <Text style={styles.btnText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  title: { color: '#fff', fontSize: width < 400 ? 18 : 24, marginTop: 15, fontWeight: 'bold' },
  label: { color: '#fff', marginTop: 25, fontSize: width < 400 ? 14 : 16 },
  card: { backgroundColor: '#1E293B', padding: width < 400 ? 10 : 15, borderRadius: 12, marginRight: 10, minWidth: width < 400 ? 110 : 150, alignItems: 'center' },
  icon: { width: width < 400 ? 30 : 50, height: width < 400 ? 30 : 50, marginBottom: 8 },
  cardText: { color: '#fff', fontWeight: 'bold', fontSize: width < 400 ? 12 : 14 },
  cardPrice: { color: '#94A3B8', marginTop: 4, fontSize: width < 400 ? 12 : 14 },
  btnSalvar: { backgroundColor: '#0A84FF', padding: width < 400 ? 14 : 18, borderRadius: 12, marginTop: 20 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: width < 400 ? 14 : 16 }
});
