// src/lib/authApi.ts
import axios from "axios";

const API_URL = "https://dummyjson.com/auth";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken?: string;
}

// Логин — dummyjson возвращает токен в ответе + куки
export const login = async (
  username: string,
  password: string
): Promise<User> => {
  const res = await axios.post(
    `${API_URL}/login`,
    {
      username,
      password,
      expiresInMins: 60,
    },
    {
      withCredentials: true, // куки
    }
  );

  const user = res.data;
  // dummyjson возвращает токен в теле ответа
  localStorage.setItem("access_token", user.token);
  if (user.refreshToken) {
    localStorage.setItem("refresh_token", user.refreshToken);
  }

  return user;
};

// Получить текущего пользователя
export const getMe = async (): Promise<User> => {
  const token = localStorage.getItem("access_token");
  const res = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
};

// Обновить токен
export const refreshToken = async (): Promise<User> => {
  const refresh = localStorage.getItem("refresh_token");
  const res = await axios.post(
    `${API_URL}/refresh`,
    { refreshToken: refresh, expiresInMins: 60 },
    { withCredentials: true }
  );
  const data = res.data;
  localStorage.setItem("access_token", data.accessToken);
  if (data.refreshToken) {
    localStorage.setItem("refresh_token", data.refreshToken);
  }
  return data;
};

// Выход
export const logoutClient = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
