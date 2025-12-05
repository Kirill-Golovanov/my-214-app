// favoritesSelectors.ts
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const selectFavoritesSet = (state: RootState) =>
  new Set(state.favorites); // O(1) проверка

export const selectIsFavorite = createSelector(
  [selectFavoritesSet, (_: RootState, productId: number) => productId],
  (favoritesSet, productId) => favoritesSet.has(productId)
);
