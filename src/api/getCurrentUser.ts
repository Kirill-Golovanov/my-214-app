// export const getCurrentUser = async () => {
//   const accessToken = localStorage.getItem("accessToken");

// import type { User } from "./authApi";

// //   if (!accessToken) {
// //     throw new Error("Нет токена авторизации");
// //   }

// //   const response = await fetch("https://dummyjson.com/auth/me", {
// //     method: "GET",
// //     headers: {
// //       Authorization: `Bearer ${accessToken}`,
// //       "Content-Type": "application/json",
// //     },
// //     credentials: "include", // Для отправки cookies (если используются)
// //   });

// //   if (!response.ok) {
// //     throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
// //   }

// //   return await response.json();
// // };


// interface ApiError {
//   message: string;
//   status: number;
// }




// export const getCurrentUser = async (): Promise<User> => {
//   // Читаем токен из localStorage
//   const accessToken = localStorage.getItem("accessToken");

//   // Детальная проверка
//   if (!accessToken) {
//     console.error("❌ Токен отсутствует в localStorage");
//     const error: ApiError = {
//       message: "Нет токена авторизации",
//       status: 401,
//     };
//     throw error;
//   }

//   if (accessToken.trim() === "") {
//     console.error("❌ Токен пуст");
//     const error: ApiError = {
//       message: "Токен авторизации пуст",
//       status: 401,
//     };
//     throw error;
//   }

//   try {
//     // Правильный URL и заголовок
//     const response = await fetch("https://dummyjson.com/auth/me", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`, // Подставляем реальный токен
//         "Content-Type": "application/json",
//       },
//       credentials: "include", // Отправляем куки, если нужны
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null);
//       const errorMessage =
//         errorData?.message || `HTTP error: ${response.status}`;
//       const error: ApiError = {
//         message: errorMessage,
//         status: response.status,
//       };
//       console.error("❌ Ошибка API:", error);
//       throw error;
//     }

//     const data: User = await response.json();
//     return data;
//   } catch (err) {
//     console.error("❌ Неожиданная ошибка при запросе:", err);
//     throw err;
//   }
// };
