import axios, { type AxiosInstance } from 'axios';



// Базовый экземпляр Axios с настройками
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://dummyjson.com", // Базовый URL
  timeout: 10000, // Таймаут 10 секунд
  headers: {
    "Content-Type": "application/json",
  },
});

// Перехватчик: добавляем токен ко всем запросам
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // Приведение типов для заголовков, если TypeScript жалуется на тип config.headers
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // <-- Здесь была ошибка
); // <-- Здесь была ошибка

// Перехватчик: обработка ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Пример: редирект на страницу входа при 401
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;


