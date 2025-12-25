import axios from 'axios';

const BASE_URL = 'https://note-app-backend.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
});

export const setToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default api;
