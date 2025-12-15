// import { QueryClient } from "@tanstack/react-query";

// Базовый запрос
// const baseFetch = async (
//   endpoint: string,
//   options?: RequestInit
// ): Promise<any> => {
//   const response = await fetch(`https://dummyjson.com${endpoint}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...options?.headers,
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   return response.json();
// };


// import api from "./axiosInstance";


// const baseFetch = async (
//   endpoint: string,
//   options?: RequestInit
// ): Promise<any> => {
//   const response = await fetch(`https://dummyjson.com${endpoint}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...options?.headers,
//     },
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || `HTTP ${response.status}`);
//   }

//   return response.json();
// };




// // Логин
// export const login = (username: string, password: string) => {
//   return api.post("/auth/login", { username, password });
// };

// // Обновление токена
// export const refreshToken = (refreshToken: string) => {
//   return api.post(
//     "/auth/refresh",
//     { refreshToken, expiresInMins: 30 },
//     { credentials: "include" }
//   );
// };






// // Функция для логина
// // export const login = async (username: string, password: string) => {
// //   return baseFetch("/auth/login", {
// //     method: "POST",
// //     body: JSON.stringify({
// //       username,
// //       password,
// //       expiresInMins: 30,
// //     }),
// //   });
// // };

// // Функция для получения данных пользователя
// export const getMe = async () => {
//   const token = localStorage.getItem("access_token");
//   if (!token) throw new Error("No token");

//   return baseFetch("/auth/me", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };



// // src/hooks/useAuth.ts
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useAppDispatch } from "@/app/hooks";
// import { setUser, logout } from "@/features/auth/authSlice";

// interface LoginCredentials {
//   username: string;
//   password: string;
// }

// interface AuthResponse {
//   id: number;
//   username: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   image: string;
//   token: string;
//   refreshToken?: string;
// }

// // Функции API (всё через fetch — без axios, без CORS-ошибок)
// const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
//   const res = await fetch("https://dummyjson.com/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       ...credentials,
//       expiresInMins: 60,
//     }),
//   });

//   if (!res.ok) throw new Error("Неверный логин или пароль");
//   return res.json();
// };

// const refreshAccessToken = async (): Promise<AuthResponse> => {
//   const refreshToken = localStorage.getItem("refresh_token");
//   if (!refreshToken) throw new Error("Нет refresh токена");

//   const res = await fetch("https://dummyjson.com/auth/refresh", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       refreshToken,
//       expiresInMins: 60,
//     }),
//   });

//   if (!res.ok) throw new Error("Не удалось обновить токен");
//   return res.json();
// };

// export const useAuth = () => {
//   const dispatch = useAppDispatch();
//   const queryClient = useQueryClient();

//   // Логин
//   const loginMutation = useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       localStorage.setItem("access_token", data.token);
//       if (data.refreshToken) {
//         localStorage.setItem("refresh_token", data.refreshToken);
//       }
//       dispatch(setUser(data));
//       queryClient.invalidateQueries({ queryKey: ["auth-user"] });
//     },
//   });

//   // Авто-обновление токена при 401
//   const refreshMutation = useMutation({
//     mutationFn: refreshAccessToken,
//     onSuccess: (data) => {
//       localStorage.setItem("access_token", data.token);
//       if (data.refreshToken) {
//         localStorage.setItem("refresh_token", data.refreshToken);
//       }
//       queryClient.invalidateQueries({ queryKey: ["auth-user"] });
//     },
//   });

//   const login = async (credentials: LoginCredentials) => {
//     try {
//       await loginMutation.mutateAsync(credentials);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error instanceof Error ? error.message : "Ошибка" };
//     }
//   };

//   const logoutUser = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     dispatch(logout());
//     queryClient.clear();
//   };

//   const refresh = async () => {
//     try {
//       await refreshMutation.mutateAsync();
//       return { success: true };
//     } catch {
//       logoutUser();
//       return { success: false };
//     }
//   };

//   return {
//     login,
//     logout: logoutUser,
//     refresh,
//     isLoginLoading: loginMutation.isPending,
//     isRefreshing: refreshMutation.isPending,
//     loginError: loginMutation.error?.message || null,
//   };
// };