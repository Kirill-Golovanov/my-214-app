// // src/pages/ProductsPage.tsx
// import { useEffect, useMemo, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { usePagination } from "@/hooks/usePagination";
// import { useProducts } from "@/hooks/useProducts";
// import ExtraLoader from "@/components/ExtraLoader/ExtraLoader";
// import ProductCardWithSlider from "@/components/ProductCardWithSlider/ProductCardWithSlider";
// import CardsFilters from "@/components/CardsFilters/CardsFilters";
// import Pagination from "@/components/Pagination/Pagination";
// import styles from "./ProductsPage.module.css";
// import type { Product } from "@/types/Product";

// const ITEMS_PER_PAGE = 20;

// export default function ProductsPage() {
//   const location = useLocation();
//   const { allProducts, isLoading, error } = useProducts();

//   // ЧИТАЕМ РЕЗУЛЬТАТЫ ПОИСКА ИЗ ШАПКИ!
//   const searchState = location.state as {
//     searchResults?: Product[];
//     searchQuery?: string;
//   } | null;

//   // Если был поиск из шапки — используем его результаты
//   const initialSearchResults = searchState?.searchResults;
//   const initialSearchQuery = searchState?.searchQuery || "";

//   // Локальные фильтры (по категории) — остались как было
//   // (поиск из шапки и локальные фильтры могут работать вместе!)
//   const categories = useMemo(() => {
//     const products = initialSearchResults || allProducts;
//     return [...new Set(products.map((p) => p.category))];
//   }, [allProducts, initialSearchResults]);

//   // Базовый массив: либо результаты поиска из шапки, либо все товары
//   const baseProducts = initialSearchResults || allProducts;

//   // Дальше — твои локальные фильтры (по категории)
//   const [category, setCategory] = useState("");

//   const filteredItems = useMemo(() => {
//     let filtered = baseProducts;

//     if (category) {
//       filtered = filtered.filter((p) => p.category === category);
//     }

//     return filtered;
//   }, [baseProducts, category]);

//   const {
//     currentPage,
//     totalPages,
//     paginatedItems,
//     gotoPage,
//     reset: resetPagination,
//   } = usePagination({
//     items: filteredItems,
//     itemsPerPage: ITEMS_PER_PAGE,
//   });

//   // Сброс пагинации при смене фильтров или при новом поиске из шапки
//   useEffect(() => {
//     resetPagination();
//   }, [filteredItems.length]);

//   if (isLoading || allProducts.length === 0) {
//     return <ExtraLoader />;
//   }

//   if (error) {
//     return <div className={styles.error}>Ошибка загрузки товаров</div>;
//   }

//   return (
//     <div className={styles.container}>
//       {/* Показываем, что это результат поиска из шапки */}
//       {initialSearchQuery && (
//         <div className={styles.searchHeader}>
//           Результаты поиска: <strong>"{initialSearchQuery}"</strong>
//           <span className={styles.resultCount}>
//             — найдено {initialSearchResults?.length || 0} товаров
//           </span>
//         </div>
//       )}

//       {/* Оставляем фильтры по категории (по желанию) */}
//       <CardsFilters
//         // search="" // ← убираем поиск из фильтров (он теперь в шапке!)
//         // setSearch={() => {}} // ← заглушка
//         category={category}
//         setCategory={setCategory}
//         categories={categories}
//         onReset={() => setCategory("")}
//       />

//       {/* Сетка товаров */}
//       <div className={styles.grid}>
//         {paginatedItems.length === 0 ? (
//           <div className={styles.empty}>Товары не найдены</div>
//         ) : (
//           paginatedItems.map((product) => (
//             <ProductCardWithSlider key={product.id} product={product} />
//           ))
//         )}
//       </div>

//       {/* Пагинация */}
//       {totalPages > 1 && (
//         <Pagination
//           totalPages={totalPages}
//           currentPage={currentPage}
//           onPageChange={gotoPage}
//         />
//       )}
//     </div>
//   );
// }

// src/pages/ProductsPage.tsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { usePagination } from "@/hooks/usePagination";
import { useProducts } from "@/hooks/useProducts";
import ExtraLoader from "@/components/ExtraLoader/ExtraLoader";
import ProductCardWithSlider from "@/components/ProductCardWithSlider/ProductCardWithSlider";
import CardsFilters from "@/components/CardsFilters/CardsFilters";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./ProductsPage.module.css";
import type { Product } from "@/types/Product";

const ITEMS_PER_PAGE = 20;

export default function ProductsPage() {
  const location = useLocation();
  const { allProducts, isLoading, error } = useProducts();

  // Читаем результаты поиска из шапки
  const searchState = location.state as {
    searchResults?: Product[];
    searchQuery?: string;
  } | null;

  const initialSearchResults = searchState?.searchResults;
  const initialSearchQuery = searchState?.searchQuery || "";

  // Категории — на основе текущих данных (поиск или все товары)
  const categories = useMemo(() => {
    const products = initialSearchResults || allProducts;
    return [...new Set(products.map((p) => p.category))];
  }, [allProducts, initialSearchResults]);

  // Базовый массив товаров
  const baseProducts = initialSearchResults || allProducts;

  // Локальные фильтры
  const [category, setCategory] = useState("");

  // Фильтрованные товары
  const filteredItems = useMemo(() => {
    if (!category) return baseProducts;
    return baseProducts.filter((p) => p.category === category);
  }, [baseProducts, category]);

  // Пагинация
  const {
    currentPage,
    totalPages,
    paginatedItems,
    gotoPage,
    reset: resetPagination,
  } = usePagination({
    items: filteredItems,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  // Сброс пагинации при смене фильтров или результатов поиска
  // resetPagination оборачиваем в useCallback, чтобы избежать лишних ререндеров
  const handleResetPagination = useCallback(() => {
    resetPagination();
  }, [resetPagination]);

  useEffect(() => {
    handleResetPagination();
  }, [filteredItems.length, handleResetPagination]);

  // Загрузка и ошибки
  if (isLoading || allProducts.length === 0) {
    return <ExtraLoader />;
  }

  if (error) {
    return <div className={styles.error}>Ошибка загрузки товаров</div>;
  }

  return (
    <div className={styles.container}>
      {/* Заголовок поиска */}
      {initialSearchQuery && (
        <div className={styles.searchHeader}>
          Результаты поиска: <strong>"{initialSearchQuery}"</strong>
          <span className={styles.resultCount}>
            — найдено {initialSearchResults?.length || 0} товаров
          </span>
        </div>
      )}

      {/* Фильтры */}
      <CardsFilters
        category={category}
        setCategory={setCategory}
        categories={categories}
        onReset={() => setCategory("")}
      />

      {/* Сетка товаров */}
      <div className={styles.grid}>
        {paginatedItems.length === 0 ? (
          <div className={styles.empty}>
            {initialSearchQuery
              ? `По запросу "${initialSearchQuery}" ничего не найдено`
              : "Товары не найдены"}
          </div>
        ) : (
          paginatedItems.map((product) => (
            <ProductCardWithSlider key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={gotoPage}
        />
      )}
    </div>
  );
}