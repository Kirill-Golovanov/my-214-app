// FavoritesPage.tsx

import type { RootState } from "@/app/store";
import Pagination from "@/components/Pagination/Pagination";
import ProductCard from "@/components/ProductCard/ProductCard";
import { usePagination } from "@/hooks/usePagination";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  // const dispatch = useDispatch();
  const favoriteIds = useSelector((state: RootState) => state.favorites);
  const { allProducts } = useProducts();

  // Фильтруем избранные товары
  const favoriteProducts = allProducts.filter((p) =>
    favoriteIds.includes(p.id)
  );

  // Применяем пагинацию (12 товаров на страницу)
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedFavorites,
    gotoPage,
  } = usePagination({
    items: favoriteProducts,
    itemsPerPage: 12, // можно вынести в константу
  });

  if (favoriteProducts.length === 0) {
    return (
      <div className={styles.empty}>
        <Heart size={80} className="text-gray-300 dark:text-gray-600" />
        <h2 className={styles.title}>Избранное пусто</h2>
        <p className={styles.text}>Добавляйте товары, нажимая на сердечко</p>
        <Link to="/products" className={styles.link}>
          Перейти к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Избранное ({favoriteProducts.length})
      </h1>

      <div className={styles.grid}>
        {paginatedFavorites.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={styles.cardWrapper}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Компонент пагинации */}
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
