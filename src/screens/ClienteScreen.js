import { View, Text, TouchableOpacity } from 'react-native';

export default function ClienteScreen({ navigation }) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#0F172A',
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      {/* BOTÃO SAIR */}
      <TouchableOpacity
        onPress={() => navigation.replace('Login')}
        style={{ position: 'absolute', top: 50, right: 20 }}
      >
        <Text style={{ color: '#f87171' }}>Sair</Text>
      </TouchableOpacity>

      <Text style={{ color: '#fff', fontSize: 24, marginBottom: 30 }}>
        Área do Cliente
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{
          backgroundColor: '#0A84FF',
          padding: 15,
          borderRadius: 10
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          Agendar Horário
        </Text>
      </TouchableOpacity>

    </View>
  );
}