// import type { User } from "@/types";

// export const authApi = {
//   login: (username: string, password: string, expiresInMins?: number) =>
//     fetch("https://dummyjson.com/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username,
//         password,
//         expiresInMins,
//       }),
//       credentials: "include",
//     }).then((res) => res.json()),

//   getCurrentUser: () =>
//     fetch("https://dummyjson.com/auth/me", {
//       method: "GET",
//       credentials: "include",
//     }).then((res) => res.json()),

//   refreshSession: (refreshToken?: string, expiresInMins?: number) =>
//     fetch("https://dummyjson.com/auth/refresh", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ refreshToken, expiresInMins }),
//       credentials: "include",
//     }).then((res) => res.json()),
// };



// // src/features/auth/authApi.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { User, AuthResponse } from "@/lib/authApi";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://dummyjson.com/auth",
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     login: builder.mutation<AuthResponse, { username: string; password: string }>({
//       query: (credentials) => ({
//         url: "/login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     getMe: builder.query<User, void>({
//       query: () => "/me",
//     }),
//     refresh: builder.mutation<AuthResponse, void>({
//       query: () => ({
//         url: "/refresh",
//         method: "POST",
//         body: { refreshToken: localStorage.getItem("refresh_token") },
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation, useGetMeQuery, useRefreshMutation } = authApi;