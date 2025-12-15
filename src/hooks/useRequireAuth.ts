// Этот хук: 
// для единое управление модалкой входа из разных мест приложения (шапка, корзина, checkout и т.д.),
// при этом запоминать, откуда пользователь пришёл, 
// чтобы после успешного логина редиректнуть его обратно (не всегда в /my-account).

// Берёт авторизацию из правильного слайса state.auth.
// Запоминает путь, откуда пользователь пытался перейти (fromPath).
// Управляет модалкой входа централизованно.
// Возвращает всё нужное для Layout и CartPage.


// src/hooks/useRequireAuth.ts

import { useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export function useRequireAuth() {
  // Правильный селектор — из auth slice
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const location = useLocation();

  // Состояние модалки
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Текущий путь — откуда пользователь кликнул (для редиректа после логина)
  const fromPath = location.pathname + location.search;

  return {
    showModal,
    openModal,
    closeModal,
    isAuthenticated,
    fromPath, // можно использовать в LoginModal для редиректа
  };
}