// src/components/LoginModal/LoginModal.tsx
import { useState } from "react";
import { login } from "@/services/authService";
import { useNavigate } from "react-router-dom";

import styles from "./LoginModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: Props) {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await login(username, password);
      onClose();
      navigate("/my-account");
    } catch (err: any) {
      setError(err.message || "Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.title}>Вход в аккаунт</h2>

        <input
          type="text"
          className={styles.input}
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          className={`${styles.input} ${styles.passwordInput}`}
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttonGroup}>
          <button
            onClick={handleLogin}
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? "Вход..." : "Войти"}
          </button>

          <button
            onClick={onClose}
            disabled={loading}
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