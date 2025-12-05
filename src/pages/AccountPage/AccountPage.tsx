// src/pages/AccountPage/AccountPage.tsx
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { loginMock, logout, setOrders } from "@/features/user/userSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, Package, Mail, Phone, Calendar } from "lucide-react";
import styles from "./AccountPage.module.css";

export default function AccountPage() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { isAuthenticated, profile, orders } = useAppSelector(
    (state) => state.user
  );

  // Состояние для пагинации
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Загрузка заказов с обработкой ошибок
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["carts", isAuthenticated],
    queryFn: async () => {
      if (!isAuthenticated) return;

      const res = await fetch("https://dummyjson.com/carts");
      if (!res.ok) {
        throw new Error("Ошибка загрузки заказов");
      }
      return res.json();
    },
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Сохранение заказов в Redux
  useEffect(() => {
    if (data?.carts) {
      dispatch(setOrders(data.carts));
    }
  }, [data, dispatch]);

  // Управление аутентификацией и кешем
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
      queryClient.invalidateQueries({
        queryKey: ["carts"], // Явно указываем ключ
      });
    } else {
      refetch();
    }
  }, [isAuthenticated, dispatch, queryClient, refetch]);

  // Обработчик кнопки "Загрузить ещё"
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  // Экран: пользователь не залогинен
  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.error}>
            <p>Вы вышли из аккаунта</p>
            <button
              onClick={() => dispatch(loginMock())}
              className={styles.retryBtn}
            >
              Войти снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Экран загрузки
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <p className={styles.loading}>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  // Экран ошибки
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.error}>
            <p>Ошибка загрузки данных</p>
            <button onClick={() => refetch()} className={styles.retryBtn}>
              Повторить запрос
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Расчёт отображаемых заказов
  const displayedOrders = orders.slice(0, page * itemsPerPage);
  const hasMore = orders.length > displayedOrders.length;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Мой аккаунт</h1>

        {/* Профиль пользователя */}
        <div className={styles.profileCard}>
          {profile ? (
            <>
              <img
                src={profile.avatar}
                alt={profile.name}
                className={styles.avatar}
              />
              <div className={styles.profileInfo}>
                <h2 className={styles.name}>{profile.name}</h2>
                <div className={styles.contactItem}>
                  <Mail size={18} />
                  {profile.email}
                </div>
                <div className={styles.contactItem}>
                  <Phone size={18} />
                  {profile.phone}
                </div>
                <div className={styles.joinDate}>
                  <Calendar size={16} />
                  На сайте с{" "}
                  {new Date(profile.createdAt).toLocaleDateString("ru-RU")}
                </div>
              </div>
            </>
          ) : (
            <p className={styles.loading}>Загрузка профиля...</p>
          )}
        </div>

        {/* Раздел заказов */}
        <div className={styles.ordersCard}>
          <div className={styles.ordersHeader}>
            <Package size={24} className="text-blue-600" />
            <h3 className={styles.ordersTitle}>Мои заказы ({orders.length})</h3>
          </div>

          {orders.length === 0 ? (
            <p className={styles.loading}>У вас пока нет заказов</p>
          ) : (
            <div>
              {displayedOrders.map((cart) => (
                <div key={cart.id} className={styles.orderItem}>
                  <div className={styles.orderHeader}>
                    <div>
                      <p className={styles.orderId}>Корзина #{cart.id}</p>
                      <p className={styles.orderProducts}>
                        {cart.products?.length || 0} товаров
                      </p>
                    </div>
                    <p className={styles.orderTotal}>
                      ${cart.total?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                </div>
              ))}

              {hasMore && (
                <button onClick={loadMore} className={styles.loadMoreBtn}>
                  Загрузить ещё ({orders.length - displayedOrders.length}{" "}
                  заказов)
                </button>
              )}
            </div>
          )}
        </div>

        {/* Кнопка выхода */}
        <div className="text-center mt-8">
          <button
            onClick={() => dispatch(logout())}
            className={styles.logoutBtn}
          >
            <LogOut size={18} />
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
}
