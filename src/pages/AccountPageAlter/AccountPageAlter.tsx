// import { useEffect, useState } from "react";
// import { useAppSelector, useAppDispatch } from "@/app/hooks";
// import { loginMock, logout, setOrders,} from "@/features/user/userSlice";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { LogOut, Package, Mail, Phone, Calendar } from "lucide-react";
// import styles from "./AccountPage.module.css";
// import { useRequireAuth } from "@/hooks/useRequireAuth";
// import AuthModal from "@/components/AuthModal/AuthModal";


// // Тип пользователя (соответствует ответу API)
// interface UserProfile {
//   id: number;
//   username: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   gender: string;
//   image: string;
//   createdAt: string; // ISO-строка
// }

// // Тип заказа (упрощённо)
// interface Order {
//   id: number;
//   products: { id: number; title: string; quantity: number }[];
//   total: number;
// }

// export default function AccountPageAlter() {
//   const { showModal, setShowModal } = useRequireAuth();
//   const dispatch = useAppDispatch();
//   const queryClient = useQueryClient();

//   const { isAuthenticated, profile, orders } = useAppSelector(
//     (state) => state.user
//   );

//   // Состояние для пагинации
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 5;

//   // Загрузка профиля пользователя
//   const { data: userData, isLoading: isUserLoading, error: userError } =
//     useQuery<UserProfile>({
//       queryKey: ["profile", isAuthenticated],
//       queryFn: async () => {
//         if (!isAuthenticated) return null;

//         const res = await fetch("https://dummyjson.com/users/1"); // Исправлен URL
//         if (!res.ok) throw new Error("Ошибка загрузки профиля");
//         return res.json();
//       },
//       enabled: isAuthenticated,
//       refetchOnWindowFocus: false,
//     });

//   // Загрузка заказов
//   const { data: ordersData, isLoading: areOrdersLoading, error: ordersError } =
//     useQuery<{ carts: Order[] }>({
//       queryKey: ["carts", isAuthenticated],
//       queryFn: async () => {
//         if (!isAuthenticated) return { carts: [] };

//         const res = await fetch("https://dummyjson.com/carts");
//         if (!res.ok) throw new Error("Ошибка загрузки заказов");
//         return res.json();
//       },
//       enabled: isAuthenticated,
//       refetchOnWindowFocus: false,
//     });

//   // Сохранение профиля в Redux
//   useEffect(() => {
//     if (userData) {
//       dispatch(
//         setProfile({
//           name: `${userData.firstName} ${userData.lastName}`,
//           email: userData.email,
//           phone: "+7 (XXX) XXX-XX-XX", // Пример (API не возвращает телефон)
//           avatar: userData.image,
//           createdAt: userData.createdAt,
//         })
//       );
//     }
//   }, [userData, dispatch]);

//   // Сохранение заказов в Redux
//   useEffect(() => {
//     if (ordersData?.carts) {
//       dispatch(setOrders(ordersData.carts));
//     }
//   }, [ordersData, dispatch]);

//   // Управление кешем при выходе
//   useEffect(() => {
//     if (!isAuthenticated) {
//       dispatch(logout());
//       queryClient.invalidateQueries({ queryKey: ["profile"] });
//       queryClient.invalidateQueries({ queryKey: ["carts"] });
//     }
//   }, [isAuthenticated, dispatch, queryClient]);


//   // Обработчик кнопки "Загрузить ещё"
//   const loadMore = () => {
//     setPage((prev) => prev + 1);
//   };

//   // Расчёт отображаемых заказов
//   const displayedOrders = orders.slice(0, page * itemsPerPage);
//   const hasMore = orders.length > displayedOrders.length;


//   // Объединённое состояние загрузки
//   const isLoading = isUserLoading || areOrdersLoading;


//   // Экран: пользователь не залогинен
//   if (!isAuthenticated) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.wrapper}>
//           <div className={styles.error}>
//             <p>Вы вышли из аккаунта</p>
//             <button
//               onClick={() => dispatch(loginMock())}
//               className={styles.retryBtn}
//             >
//               Войти снова
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Экран загрузки
//   if (isLoading) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.wrapper}>
//           <p className={styles.loading}>Загрузка данных...</p>
//         </div>
//       </div>
//     );
//   }

//   // Экран ошибки
//   if (userError || ordersError) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.wrapper}>
//           <div className={styles.error}>
//             <p>Ошибка загрузки данных</p>
//             <button onClick={() => refetch()} className={styles.retryBtn}>
//               Повторить запрос
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <h1 className={styles.title}>Мой аккаунт</h1>
//         <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />

//         {/* Профиль пользователя */}
//         <div className={styles.profileCard}>
//           {profile ? (
//             <>
//               <img
//                 src={profile.avatar}
//                 alt={profile.name}
//                 className={styles.avatar}
//               />
//               <div className={styles.profileInfo}>
//                 <h2 className={styles.name}>{profile.name}</h2>
//                 <div className={styles.contactItem}>
//                   <Mail size={18} />
//                   {profile.email}
//                 </div>
//                 {profile.phone && (
//                   <div className={styles.contactItem}>
//                     <Phone size={18} />
//                     {profile.phone}
//                   </div>
//                 )}
//                 <div className={styles.joinDate}>
//                   <Calendar size={16} />
//                   На сайте с{" "}
//                   {new Date(profile.createdAt).toLocaleDateString("ru-RU")}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <p className={styles.loading}>Профиль не загружен</p>
//           )}
//         </div>

//         {/* Раздел заказов */}
//         <div className={styles.ordersCard}>
//           <div className={styles.ordersHeader}>
//             <Package size={24} className={styles.icon} />
//             <h3 className={styles.ordersTitle}>
//               Мои заказы ({orders.length})
//             </h3>
//           </div>

//           {orders.length === 0 ? (
//             <p className={styles.empty}>У вас пока нет заказов</p>
//           ) : (
//             <div>
//               {displayedOrders.map((cart) => (
//                 <div key={cart.id} className={styles.orderItem}>
//                   <div className={styles.orderHeader}>
//                     <div>
//                       <p className={styles.orderId}>Заказ #{cart.id}</p>
//                       <p className={styles.orderProducts}>
//                         {cart.products?.length || 0} товаров
//                       </p>
//                     </div>
//                     <p className={styles.orderTotal}>
//                       ${cart.total?.toFixed(2) || "0.00"}
//                     </p>
//                   </div>
//                 </div>
//               ))}

//               {hasMore && (
//                 <button onClick={loadMore} className={styles.loadMoreBtn}>
//                   Загрузить ещё ({orders.length - displayedOrders.length} заказов)
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Кнопка выхода */}
//         <div className={styles.logoutContainer}>
//           <button
//             onClick={() => dispatch(logout())}
//           className={styles.logoutBtn}
//         >
//           <LogOut size={18} />
//           Выйти из аккаунта
//         </button>
//       </div>
//     </div>
//   </div>
// );
// }
