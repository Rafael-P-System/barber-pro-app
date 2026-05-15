import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para salvar o token no celular

const api = axios.create({
  // O Expo buscará o IP que você configurou no arquivo .env
  baseURL: process.env.EXPO_PUBLIC_API_URL, 
});

// AJUSTE DE SEGURANÇA: Injeta o Token em cada chamada automaticamente
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('@BarberPro:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Erro ao recuperar token", error);
  }
  return config;
});

export default api;