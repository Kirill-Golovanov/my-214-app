// src/components/Layout.tsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Package, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useState } from "react";

import styles from "./Layout.module.css";
import type { RootState } from "@/app/store";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import SearchBar from "../SearchBar/SearchBar";
import { useProducts } from "@/hooks/useProducts"; // ← берём кэшированные товары

export default function Layout({ children }: { children?: React.ReactNode }) {
  // Считываем корзину и избранное из Redux (это правильно!)
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector((state: RootState) => state.favorites);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favCount = favorites.length;

  // ← ГЛАВНОЕ: берём ВСЕ товары из кэша TanStack Query
  const { allProducts = [] } = useProducts(1); // page=1 — просто триггер, запроса не будет

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Мгновенный поиск по уже загруженным товарам
  const handleSearch = (value: string) => {
    setSearch(value);

    const query = value.trim().toLowerCase();

    if (!query) {
      navigate("/products");
      return;
    }

    // Фильтруем мгновенно — без запросов на сервер!
    const results = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    // Передаём результаты прямо в ProductsPage через state
    navigate("/products", {
      state: {
        searchResults: results,
        searchQuery: value,
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          {/* ЛОГОТИП — всегда первый */}
          <NavLink to="/products" className={styles.logo}>
            {/* Иконка домика на мобильных (≤768px) */}
            <Home className={styles.logoIcon} size={28} strokeWidth={2.5} />

            {/* Текст логотипа на планшетах и десктопе (≥769px) */}
            <span className={styles.logoText}>MY SHOP</span>
          </NavLink>

          {/* ПОИСК — в центре на десктопе, на второй строке на планшете */}
          <div className={styles.searchWrapper}>
            <SearchBar
              search={search}
              setSearch={handleSearch}
              placeholder="Поиск по 5000+ товарам..."
            />
          </div>

          {/* НАВИГАЦИЯ + ТЕМА — справа */}
          <div className={styles.rightGroup}>
            <nav className={styles.nav}>
              {/* Товары */}
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

              <NavLink
                to="/my-account"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                <div className={styles.iconWrapper}>
                  <User className={styles.icon} />
                </div>
                <span className={styles.linkText}>Аккаунт</span>
              </NavLink>
            </nav>
          </div>
        </div>

        <div className={styles.themeToggle}>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.content}>{children || <Outlet />}</div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          СТЭК: React + Vite + TypeScript + Redux Toolkit + TanStack Query
        </div>
      </footer>
    </div>
  );
}
