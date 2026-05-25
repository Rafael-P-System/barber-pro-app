import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
  // URL base limpa, sem o /api
  baseURL: 'https://barbearia-api-swti.onrender.com', 
  timeout: 120000,
});

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
  (error) => Promise.reject(error)
);

export default api;