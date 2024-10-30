import axios from "axios";

export const BASE_URL ='https://english-school-back24.vercel.app/'


const instance = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default instance;