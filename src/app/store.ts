// // src/app/store.ts
// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "../features/cart/cartSlice";
// import favoritesReducer from "../features/favorites/favoritesSlice";
// import searchReducer from "@/features/search/searchSlice";
// import userReducer from "@/features/user/userSlice";

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     favorites: favoritesReducer,
//     search: searchReducer,
//     user: userReducer,
//   },
// });


// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;   // ← ТОЧНО ТАК!


// // src/app/store.ts
// import { configureStore } from '@reduxjs/toolkit';

// import cartReducer from '@/features/cart/cartSlice';
// import favoritesReducer from '@/features/favorites/favoritesSlice';
// import searchReducer from '@/features/search/searchSlice';
// import authReducer from '@/features/auth/authSlice'; // ← наш текущий auth слайс

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     favorites: favoritesReducer,
//     search: searchReducer,
//     auth: authReducer, // ← только обычные редьюсеры
//   },
//   // middleware по умолчанию достаточно (thunk уже включён)
//   // Никакого .concat(authApi.middleware) — authApi удалён!
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '@/features/cart/cartSlice';
import favoritesReducer from '@/features/favorites/favoritesSlice';
import searchReducer from '@/features/search/searchSlice';
import authReducer from '@/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    search: searchReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;