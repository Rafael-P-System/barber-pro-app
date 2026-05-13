import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL =
  Platform.OS === 'web'
    ? 'http://localhost:8080/api'
    : 'http://192.168.10.11:8080/api';

const api = axios.create({ baseURL });

// 🔥 interceptor CORRETO (funciona mobile + web)
api.interceptors.request.use(async (config) => {

  let token = null;

  if (Platform.OS === 'web') {
    token = localStorage.getItem('jwtToken');
  } else {
    token = await AsyncStorage.getItem('jwtToken');
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;