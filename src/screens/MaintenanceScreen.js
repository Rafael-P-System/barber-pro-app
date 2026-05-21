import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  Dimensions, 
  Platform,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function MaintenanceScreen({ navigation }) {
  return (
    <LinearGradient colors={['#000', '#1A1A1A', '#333']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.content}>
        
        <View style={styles.mainContainer}>
          {/* Ícone vetorial no lugar do emoji para garantir alinhamento idêntico em qualquer tela */}
          <View style={styles.iconCircle}>
            <Icon name="tools" size={width < 400 ? 45 : 60} color="#FFD700" />
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

          {/* 🔥 CORREÇÃO: Alterado de replace para navigate para manter a estabilidade do app */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Verificar Novamente</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé protegido pelo SafeAreaView para não sumir embaixo das barras de gestos nativas */}
        <Text style={styles.footer}>Rafael Silva • Tecnologia para Barbearias</Text>
        
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 30 
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    borderColor: '#444' 
  },
  title: { 
    fontSize: width < 400 ? 22 : isWeb ? 32 : 28, 
    fontWeight: 'bold', 
    color: '#FFD700', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  card: { 
    backgroundColor: '#1E293B', 
    padding: width < 400 ? 14 : 20, 
    borderRadius: 15, 
    width: '100%', 
    maxWidth: isWeb ? 500 : 420, 
    borderLeftWidth: 4, 
    borderLeftColor: '#FFD700' 
  },
  message: { 
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16, 
    textAlign: 'left', 
    color: '#94A3B8', 
    lineHeight: 22 
  },
  highlight: { 
    color: '#FFD700', 
    fontWeight: 'bold', 
    marginTop: 15, 
    fontSize: width < 400 ? 12 : 14 
  },
  button: { 
    marginTop: 40, 
    backgroundColor: '#FFD700', 
    paddingVertical: width < 400 ? 12 : 15, 
    paddingHorizontal: width < 400 ? 30 : 40, 
    borderRadius: 10, 
    width: '100%', 
    maxWidth: isWeb ? 500 : 400, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#000', 
    fontWeight: 'bold', 
    fontSize: width < 400 ? 14 : isWeb ? 18 : 16 
  },
  footer: { 
    fontSize: width < 400 ? 11 : 12, 
    color: '#475569', 
    letterSpacing: 1,
    marginBottom: Platform.OS === 'ios' ? 10 : 20,
    textAlign: 'center'
  }
});