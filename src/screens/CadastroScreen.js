import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

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
  input: {
    backgroundColor: '#1E293B',
    color: '#fff',
    paddingVertical: width < 400 ? 10 : 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: width < 400 ? 14 : 16
  },
  button: {
    backgroundColor: '#0A84FF',
    padding: width < 400 ? 12 : 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: width < 400 ? 14 : 16
  }
}); // ✅ chave final fechada corretamente
