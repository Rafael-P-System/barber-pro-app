import axios from 'axios';
import { Platform } from 'react-native';

const baseURL =
  Platform.OS === 'web'
    ? 'http://localhost:8080/api'   // navegador
    : 'http://192.168.10.14:8080/api'; // celular na mesma rede

const api = axios.create({ baseURL });
export default api;
