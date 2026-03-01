// // src/components/Layout/Layout.tsx
// import { NavLink, Outlet, useNavigate,  } from "react-router-dom";
// import { ShoppingCart, Heart, User, Package, Home } from "lucide-react";
// import { motion } from "framer-motion";
// import { useSelector } from "react-redux";
// import { useState } from "react";

// import styles from "./Layout.module.css";
// import type { RootState } from "@/app/store";
// import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
// import SearchBar from "../SearchBar/SearchBar";
// import { useProducts } from "@/hooks/useProducts";

// import { useRequireAuth } from "@/hooks/useRequireAuth";
// import { useAppSelector } from "@/app/hooks";
// import LoginModal from "../LoginModal/LoginModal";


// export default function Layout({ children }: { children?: React.ReactNode }) {
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const favorites = useSelector((state: RootState) => state.favorites);

//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   const favCount = favorites.length;

//   const { allProducts = [] } = useProducts(1);

//   const navigate = useNavigate();
//   // const location = useLocation();
//   const [search, setSearch] = useState("");

//   const { isAuthenticated, user } = useAppSelector((state) => state.user);
//   // const { showModal, openModal, closeModal } = useRequireAuth();
//   const { showModal, openModal, closeModal, fromPath } = useRequireAuth();

//   const handleSearch = (value: string) => {
//     setSearch(value);
//     const query = value.trim().toLowerCase();

//     if (!query) {
//       navigate("/products");
//       return;
//     }

//     const results = allProducts.filter(
//       (product) =>
//         product.title.toLowerCase().includes(query) ||
//         product.description.toLowerCase().includes(query)
//     );

//     navigate("/products", {
//       state: { searchResults: results, searchQuery: value },
//     });
//   };

//   // Клик по иконке аккаунта
//   const handleAccountClick = (e: React.MouseEvent) => {
//     e.preventDefault();

//     if (!isAuthenticated) {
//       openModal(); // ← Открываем модалку и сохраняем путь
//     } else {
//       navigate("/my-account");
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       {/* Header */}
//       <header className={styles.header}>
//         <div className={styles.container}>
//           <NavLink to="/products" className={styles.logo}>
//             <Home className={styles.logoIcon} size={28} strokeWidth={2.5} />
//             <span className={styles.logoText}>MY SHOP</span>
//           </NavLink>

//           <div className={styles.searchWrapper}>
//             <SearchBar
//               search={search}
//               setSearch={handleSearch}
//               placeholder="Поиск по 5000+ товарам..."
//             />
//           </div>

//           <div className={styles.rightGroup}>
//             <nav className={styles.nav}>
//               <NavLink
//                 to="/products"
//                 className={({ isActive }) =>
//                   `${styles.link} ${isActive ? styles.active : ""}`
//                 }
//                 end
//               >
//                 <div className={styles.iconWrapper}>
//                   <Package className={styles.icon} />
//                 </div>
//                 <span className={styles.linkText}>Товары</span>
//               </NavLink>

//               <NavLink
//                 to="/favorites"
//                 className={({ isActive }) =>
//                   `${styles.link} ${isActive ? styles.active : ""}`
//                 }
//               >
//                 <div className={styles.iconWrapper}>
//                   <Heart className={styles.icon} />
//                   {favCount > 0 && (
//                     <motion.span
//                       key={favCount}
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className={styles.badge}
//                     >
//                       {favCount}
//                     </motion.span>
//                   )}
//                 </div>
//                 <span className={styles.linkText}>Избранное</span>
//               </NavLink>

//               <NavLink
//                 to="/cart"
//                 className={({ isActive }) =>
//                   `${styles.link} ${isActive ? styles.active : ""}`
//                 }
//               >
//                 <div className={styles.iconWrapper}>
//                   <ShoppingCart className={styles.icon} />
//                   {cartCount > 0 && (
//                     <motion.span
//                       key={cartCount}
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className={styles.badge}
//                     >
//                       {cartCount}
//                     </motion.span>
//                   )}
//                 </div>
//                 <span className={styles.linkText}>Корзина</span>
//               </NavLink>

//               {/* Иконка аккаунта */}
//               <button onClick={handleAccountClick} className={styles.link}>
//                 <div className={styles.iconWrapper}>
//                   {isAuthenticated && user?.image ? (
//                     <img
//                       src={user.image}
//                       alt={user.username}
//                       className="w-6 h-6 rounded-full"
//                     />
//                   ) : (
//                     <User className={styles.icon} />
//                   )}
//                 </div>
//                 <span className={styles.linkText}>
//                   {isAuthenticated ? user?.username : "Аккаунт"}
//                 </span>
//               </button>
//             </nav>
//           </div>
//         </div>

//         <div className={styles.themeToggle}>
//           <ThemeToggle />
//         </div>
//       </header>

//       {/* Main */}
//       <main className={styles.main}>
//         <div className={styles.content}>{children || <Outlet />}</div>
//       </main>

//       {/* Footer */}
//       <footer className={styles.footer}>
//         <div className={styles.container}>
//           СТЭК: React + Vite + TypeScript + Redux Toolkit + TanStack Query
//         </div>
//       </footer>

//       {/* Модалка входа */}
//       <LoginModal isOpen={showModal} onClose={closeModal} fromPath={fromPath} />
//     </div>
//   );
// }


// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { ShoppingCart, Heart, User, Package, Home } from "lucide-react";
// import { motion } from "framer-motion";
// import { useSelector } from "react-redux";
// import { useState } from "react";

// import styles from "./Layout.module.css";
// import type { RootState } from "@/app/store";
// import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
// import SearchBar from "../SearchBar/SearchBar";
// import { useProducts } from "@/hooks/useProducts";
// import { useRequireAuth } from "@/hooks/useRequireAuth";
// import { useAppSelector } from "@/app/hooks";
// import LoginModal from "../LoginModal/LoginModal";

// export default function Layout({ children }: { children?: React.ReactNode }) {
//   // Считываем корзину и избранное из Redux
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const favorites = useSelector((state: RootState) => state.favorites);

//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   const favCount = favorites.length;

//   // Получаем все товары из кэша TanStack Query
//   const { allProducts = [] } = useProducts(1);

//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   // Мгновенный поиск по загруженным товарам
//   const handleSearch = (value: string) => {
//     setSearch(value);
//     const query = value.trim().toLowerCase();

//     if (!query) {
//       navigate("/products");
//       return;
//     }

//     const results = allProducts.filter(
//       (product) =>
//         product.title.toLowerCase().includes(query) ||
//         product.description.toLowerCase().includes(query)
//     );

//     navigate("/products", {
//       state: {
//         searchResults: results,
//         searchQuery: value,
//       },
//     });
//   };

//   const { isAuthenticated } = useAppSelector((state) => state.user);
//   const { showModal, openModal, closeModal } = useRequireAuth();

//   const handleAccountClick = () => {
//     if (!isAuthenticated) {
//       openModal();
//     } else {
//       navigate("/my-account");
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       {/* Header */}
//       <header className={styles.header}>
//         <div className={styles.container}>
//           {/* Логотип */}
//           <NavLink to="/products" className={styles.logo}>
//             <Home className={styles.logoIcon} size={28} strokeWidth={2.5} />
//             <span className={styles.logoText}>MY SHOP</span>
//           </NavLink>

//           {/* Поиск */}
//           <div className={styles.searchWrapper}>
//             <SearchBar
//               search={search}
//               setSearch={handleSearch}
//               placeholder="Поиск по 5000+ товарам..."
//             />
//           </div>

//           {/* Навигация и тема */}
//           <div className={styles.rightGroup}>
//             <nav className={styles.nav}>
//               {/* Товары */}
//               <NavLink
//                 to="/products"
//                 className={({ isActive }) =>
//                   `${styles.link} ${isActive ? styles.active : ""}`
//                 }
//                 end
//               >
//                 <div className={styles.iconWrapper}>
//                   <Package className={styles.icon} />
//                 </div>
//                 <span className={styles.linkText}>Товары</span>
//               </NavLink>

//               {/* Избранное */}
//               <NavLink
//                 to="/favorites"
//                 className={({ isActive }) =>
//                   `${styles.link} ${isActive ? styles.active : ""}`
//                 }
//               >
//                 <div className={styles.iconWrapper}>
//                   <Heart className={styles.icon} />
//                   {favCount > 0 && (
//                     <motion.span
//                       key={favCount}
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className={styles.badge}
//                     >
//                       {favCount}
//                     </motion.span>
//                   )}
//                 </div>
//                 <span className={styles.linkText}>Избранное</span>
//               </NavLink>

//               {/* Корзина */}
//               <NavLink
//                 to="/cart"
//                 className={({ isActive }) =>
//                   `${styles.link} ${isActive ? styles.active : ""}`
//                 }
//               >
//                 <div className={styles.iconWrapper}>
//                   <ShoppingCart className={styles.icon} />
//                   {cartCount > 0 && (
//                     <motion.span
//                       key={cartCount}
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className={styles.badge}
//                     >
//                       {cartCount}
//                     </motion.span>
//                   )}
//                 </div>
//                 <span className={styles.linkText}>Корзина</span>
//               </NavLink>

//               {/* Аккаунт */}
//               <NavLink
//                 to="#"
//                 onClick={handleAccountClick}
//                 className={({ isActive }) =>
//                   `${styles.link} ${isActive ? styles.active : ""}`
//                 }
//               >
//                 <div className={styles.iconWrapper}>
//                   <User className={styles.icon} />
//                 </div>
//                 <span className={styles.linkText}>Аккаунт</span>
//               </NavLink>
//             </nav>
//           </div>
//         </div>

//         {/* Переключатель темы */}
//         <div className={styles.themeToggle}>
//           <ThemeToggle />
//         </div>
//       </header>

//       {/* Основной контент */}
//       <main className={styles.main}>
//         <div className={styles.content}>{children || <Outlet />}</div>
//       </main>

//       {/* Footer */}
//       <footer className={styles.footer}>
//         <div className={styles.container}>
//           СТЭК: React + Vite + TypeScript + Redux Toolkit + TanStack Query
//         </div>
//       </footer>

//       {/* Модальное окно входа */}
//       <LoginModal isOpen={showModal} onClose={closeModal} />
//     </div>
//   );
// }

// src/components/Layout/Layout.tsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Package, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import styles from "./Layout.module.css";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import SearchBar from "../SearchBar/SearchBar";
import { useProducts } from "@/hooks/useProducts";
import { useAppSelector } from "@/app/hooks";
import LoginModal from "../LoginModal/LoginModal";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const cartItems = useAppSelector((state) => state.cart.items);
  // const favorites = useAppSelector((state) => state.favorites.items || state.favorites);
  const favorites = useAppSelector((state) => state.favorites); // ← просто массив ID

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favCount = Array.isArray(favorites) ? favorites.length : 0;

  const { allProducts = [] } = useProducts(1);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Состояние авторизации
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Управление модалкой входа
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleSearch = (value: string) => {
    setSearch(value);
    const query = value.trim().toLowerCase();

    if (!query) {
      navigate("/products");
      return;
    }

    const results = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    navigate("/products", {
      state: { searchResults: results, searchQuery: value },
    });
  };

  // Клик по иконке аккаунта
  const handleAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isAuthenticated) {
      navigate("/my-account");
    } else {
      openLoginModal();
    }
  };

  // Текст под иконкой: имя пользователя или "Аккаунт"
  const accountText = isAuthenticated
    ? user?.firstName || user?.username || "Аккаунт"
    : "Аккаунт";

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <NavLink to="/products" className={styles.logo}>
            <Home className={styles.logoIcon} size={28} strokeWidth={2.5} />
            <span className={styles.logoText}>MY SHOP</span>
          </NavLink>

          <div className={styles.searchWrapper}>
            <SearchBar
              search={search}
              setSearch={handleSearch}
              placeholder="Поиск по 5000+ товарам..."
            />
          </div>

          <div className={styles.rightGroup}>
            <nav className={styles.nav}>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                end
              >
                <div className={styles.iconWrapper}>
                  <Package className={styles.icon} />
                </div>
                <span className={styles.linkText}>Товары</span>
              </NavLink>

              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                <div className={styles.iconWrapper}>
                  <Heart className={styles.icon} />
                  {favCount > 0 && (
                    <motion.span
                      key={favCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={styles.badge}
                    >
                      {favCount}
                    </motion.span>
                  )}
                </div>
                <span className={styles.linkText}>Избранное</span>
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                <div className={styles.iconWrapper}>
                  <ShoppingCart className={styles.icon} />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={styles.badge}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </div>
                <span className={styles.linkText}>Корзина</span>
              </NavLink>

              {/* Иконка аккаунта */}
              {/* <button onClick={handleAccountClick} className={styles.link}>
                <div className={styles.iconWrapper}>
                  {isAuthenticated && user?.image ? (
                    <img
                      src={user.image}
                      alt={user.username}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className={styles.icon} />
                  )}
                </div>
                <span className={styles.linkText}>{accountText}</span>
              </button> */}
              {/* Иконка аккаунта */}
{/* Иконка аккаунта */}
<button onClick={handleAccountClick} className={styles.link}>
  <div className={styles.iconWrapper}>
    {isAuthenticated && user?.image ? (
      <img
        src={user.image}
        alt={user.firstName || user.username}
        className={styles.avatar}  // ← теперь через module.css
      />
    ) : (
      <User className={styles.icon} />
    )}
  </div>
  <span className={styles.linkText}>{accountText}</span>
</button>


            </nav>
          </div>
        </div>

        <div className={styles.themeToggle}>
          <ThemeToggle />
        </div>
      </header>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.content}>{children || <Outlet />}</div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          СТЭК: React + Vite + TypeScript + Redux Toolkit + TanStack Query
        </div>
      </footer>

      {/* Модалка входа — без fromPath */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
      />
    </div>
  );
}