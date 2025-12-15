// src/pages/AccountPageVersion2/AccountPageVersion2.tsx

import { useAppSelector } from '@/app/hooks';
import { logoutUser } from '@/services/authService';
import { useNavigate } from 'react-router-dom';

export default function AccountPageVersion2() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (!user) return null; // на всякий случай

  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '2rem' }}>
      <h2>Личный кабинет</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <img src={user.image} alt={user.firstName} style={{ width: '100px', borderRadius: '50%' }} />
        <div>
          <h3>{user.firstName} {user.lastName}</h3>
          <p>@{user.username}</p>
          <p>{user.email}</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Информация</h3>
        <p><strong>Пол:</strong> {user.gender}</p>
         <p>Здесь будут данные пользователя  .</p>
        {/* Здесь можно добавить телефон, адрес и т.д. — dummyjson их не возвращает, но можно расширить */}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>История заказов</h3>
        {/* (пока пусто — можно подключить отдельный эндпоинт или локальное хранение) */}
        <p>Здесь будет список заказов .</p>
      </div>

      <button
        onClick={handleLogout}
        style={{ padding: '0.75rem 1.5rem', background: '#dc3545', color: 'white', border: 'none' }}
      >
        Выйти из аккаунта
      </button>
    </div>
  );
}