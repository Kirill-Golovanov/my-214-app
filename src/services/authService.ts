// // ! Вариант -   прямой запрос с credentials: 'include',   не работает на тестовом
// //  ! Dummyjson.com — публичный тестовый API, и его владельцы не меняют headers под каждый localhost

//  // src/services/authService.ts

// import { store } from '@/app/store';
// import { setCredentials, updateAccessToken, logout } from '@/features/auth/authSlice';

// const API_BASE = 'https://dummyjson.com';

// export const login = async (username: string, password: string) => {
//   const response = await fetch(`${API_BASE}/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include',
//     body: JSON.stringify({ username, password, expiresInMins: 60 }),
//   });

//   if (!response.ok) {
//     const err = await response.json().catch(() => ({}));
//     throw new Error(err.message || 'Ошибка входа');
//   }

//   const data = await response.json();

//   const user = {
//     id: data.id,
//     username: data.username,
//     email: data.email,
//     firstName: data.firstName,
//     lastName: data.lastName,
//     gender: data.gender,
//     image: data.image,
//   };

//   store.dispatch(setCredentials({ user, accessToken: data.accessToken }));
//   return data;
// };

// export const refreshToken = async () => {
//   const response = await fetch(`${API_BASE}/auth/refresh`, {
//     method: 'POST',
//     credentials: 'include',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ expiresInMins: 60 }),
//   });

//   if (!response.ok) {
//     store.dispatch(logout());
//     throw new Error('Сессия истекла');
//   }

//   const data = await response.json();
//   store.dispatch(updateAccessToken(data.accessToken));
//   return data;
// };

// export const logoutUser = () => {
//   store.dispatch(logout());
// };


// // src/services/authService.ts
import { store } from '@/app/store';
import { setCredentials, updateAccessToken, logout } from '@/features/auth/authSlice';

export const login = async (username: string, password: string) => {
  const response = await fetch(`/auth/login`, {  // ← вот здесь /auth/login
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // оставляем — теперь работает через proxy
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Ошибка входа');
  }

  const data = await response.json();

  const user = {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    image: data.image,
  };

  store.dispatch(setCredentials({ user, accessToken: data.accessToken }));
  return data;
};

export const refreshToken = async () => {
  const response = await fetch(`/auth/refresh`, {  // ← /auth/refresh
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expiresInMins: 60 }),
  });

  if (!response.ok) {
    store.dispatch(logout());
    throw new Error('Сессия истекла');
  }

  const data = await response.json();
  store.dispatch(updateAccessToken(data.accessToken));
  return data;
};

export const logoutUser = () => {
  store.dispatch(logout());
};



// // src/services/authService.ts
// import { store } from '@/app/store';
// import { setCredentials, logout } from '@/features/auth/authSlice';

// const API_BASE = 'https://dummyjson.com';

// export const login = async (username: string, password: string) => {
//   const response = await fetch(`${API_BASE}/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     // УБРАЛИ credentials: 'include' — не нужны cookies
//     body: JSON.stringify({ username, password, expiresInMins: 60 }),
//   });

//   if (!response.ok) {
//     const err = await response.json().catch(() => ({}));
//     throw new Error(err.message || 'Ошибка входа');
//   }

//   const data = await response.json();

//   const user = {
//     id: data.id,
//     username: data.username,
//     email: data.email,
//     firstName: data.firstName,
//     lastName: data.lastName,
//     gender: data.gender,
//     image: data.image,
//   };

//   // Сохраняем accessToken в Redux (в памяти)
//   store.dispatch(setCredentials({ user, accessToken: data.accessToken }));

//   return data;
// };

// // Для protected запросов (например, /auth/me или другие)
// export const fetchProtected = async (url: string) => {
//   const token = store.getState().auth.accessToken;

//   if (!token) throw new Error('No token');

//   const response = await fetch(`${API_BASE}${url}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//     // credentials можно оставить или убрать — не важно
//   });

//   if (response.status === 401) {
//     // Можно добавить рефреш, но для простоты — логаут
//     store.dispatch(logout());
//     throw new Error('Token expired');
//   }

//   if (!response.ok) throw new Error('Request failed');

//   return response.json();
// };

// // Логаут — просто чистим Redux
// export const logoutUser = () => {
//   store.dispatch(logout());
// };