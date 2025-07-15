// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.236:8080/api',
});

export default api;
