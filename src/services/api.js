import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
  // 🔥 URL com o prefixo /api para alinhar com o seu Controller Java
  baseURL: 'https://barbearia-api-swti.onrender.com/api', 
  // 🔥 Timeout de 120 segundos para dar tempo do servidor Render sair do repouso
  timeout: 120000,
});

// Ajuste de segurança para injetar o Token automaticamente
api.interceptors.request.use(
  async (config) => {
    try {
      let token = null;

      if (Platform.OS === 'web') {
        token = localStorage.getItem('@BarberPro:token');
      } else {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        token = await AsyncStorage.getItem('@BarberPro:token');
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erro ao recuperar token", error);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;