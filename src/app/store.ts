// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import searchReducer from "@/features/search/searchSlice";
import userReducer from "@/features/user/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    search: searchReducer,
    user: userReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


// // RootState — тип всего состояния store
// export type RootState = ReturnType<typeof store.getState>;

// // AppDispatch — тип для dispatch (опционально, но полезно)
// export type AppDispatch = ReturnType<typeof store.dispatch>;


// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;   // ← ТОЧНО ТАК!


// // src/app/store.ts
// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "../features/cart/cartSlice";
// // Другие reducers по необходимости

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     // Добавьте другие slices
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
