// favoritesSlice.ts — ИСПРАВЛЕННЫЙ

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// Импортируем тип RootState, чтобы селектор знал структуру всего Store
import type { RootState } from "../../app/store"; 

const initialState: number[] =
  JSON.parse(localStorage.getItem("favorites") || "[]") || [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.includes(id)) {
        // Redux Toolkit позволяет мутировать state напрямую или возвращать новый массив
        return state.filter((fid) => fid !== id); 
      } else {
        // В данном случае push мутирует исходный массив, что допустимо в createSlice
        state.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state));
      // Возвращаем измененный state, если использовали мутацию
      return state; 
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

// --- Добавляем селектор здесь ---
// Селектор принимает весь RootState и возвращает только нужную часть (массив number[])
export const selectFavoriteIds = (state: RootState) => state.favorites;


export default favoritesSlice.reducer;
