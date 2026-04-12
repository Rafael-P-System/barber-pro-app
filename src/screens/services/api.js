import axios from 'axios';

const api = axios.create({
  // 10.0.2.2 é o endereço que o Android usa para enxergar o seu PC
  baseURL: 'http://10.0.2.2:8080', 
});

// 🕵️ Dica de QA: Verifique se o seu Controller no Java tem a rota /barbeiros ou /barbeiro (no singular)
export const cadastrarBarbeiro = (dados) => api.post('/barbeiro', dados);
export const listarServicos = () => api.get('/servico');

export default api;