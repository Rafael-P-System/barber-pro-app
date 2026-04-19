import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.10.12:8080',
  timeout: 10000, // Aumentei para 10s para evitar o timeout de rede
});

// Funções de chamada para a API
export const cadastrarBarbeiro = (dados) => api.post('/barbeiro', dados);
export const loginBarbeiro = (dados) => api.post('/barbeiro/login', dados);
export const listarServicos = () => api.get('/servico');

export default api;