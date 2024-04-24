import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000'

const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true
})

instance.interceptors.request.use((config) => {
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default instance;