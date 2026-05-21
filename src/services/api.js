import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL: 'https://barbearia-api-swti.onrender.com', 
  // 🔥 Mantido: 90 segundos de tolerância para a máquina do Render acordar
  timeout: 90000, 
});

// Ajuste de segurança para injetar o Token automaticamente
api.interceptors.request.use(
  async (config) => {
    try {
      let token = null;

      if (Platform.OS === 'web') {
        token = localStorage.getItem('@BarberPro:token');
      } else {
        // O 'require' dinâmico funciona bem, mas precisamos garantir que o await termine
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        token = await AsyncStorage.getItem('@BarberPro:token');
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erro ao recuperar token", error);
    }
    
    // 🔥 IMPORTANTE: Garante que a config (modificada ou não) sempre seja retornada
    return config;
  },
  (error) => {
    // 🔥 Tratamento de erro caso a própria montagem da requisição falhe
    return Promise.reject(error);
  }
);

export default api;