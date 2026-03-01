// src/components/auth/LoginModal.tsx  (рекомендую переименовать в LoginModal)
import { useState } from "react";
import { login } from "@/services/authService"; // ← наша простая функция логина
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "@/features/auth/authSlice"; // ← правильный action
import { useNavigate } from "react-router-dom";

import styles from "./AuthModal.module.css"; // или LoginModal.module.css

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      // login возвращает полный ответ от dummyjson (с accessToken, user полями и т.д.)
      const data = await login(username, password);

      // Формируем user объект (можно взять напрямую из data, но явно для типизации)
      const user = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
      };

      // Сохраняем в Redux
      dispatch(setCredentials({ user, accessToken: data.accessToken }));

      // Закрываем модалку и редиректим в личный кабинет
      onClose();
      navigate("/my-account");
    } catch (err) {
      setError("Неверный логин или пароль");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Вход в аккаунт</h2>

        <input
          type="text"
          placeholder="Логин (emilys)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          disabled={isLoading}
        />

        <input
          type="password"
          placeholder="Пароль (emilyspass)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          disabled={isLoading}
        />

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttonGroup}>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={styles.loginButton}
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>

          <button
            onClick={onClose}
            disabled={isLoading}
            className={styles.cancelButton}
          >
            Отмена
          </button>
        </div>

        <p className={styles.hint}>
          Тестовые данные: <strong>emilys</strong> / <strong>emilyspass</strong>
        </p>
      </div>
    </div>
  );
}