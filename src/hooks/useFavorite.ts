// src/hooks/useFavorite.ts — 100% РАБОЧАЯ ВЕРСИЯ
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import type { RootState } from "../app/store";

export function useFavorite(productId: number) {
  const dispatch = useDispatch();

  // state.favorites — это number[], а не объект!
  const isFavorite = useSelector(
    (state: RootState) =>
      Array.isArray(state.favorites) && state.favorites.includes(productId)
  );

  const toggle = useCallback(() => {
    dispatch(toggleFavorite(productId));
  }, [dispatch, productId]);

  return { isFavorite, toggle };
}
