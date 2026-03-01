// FavoriteButton.tsx
import { Heart } from "lucide-react";
import styles from "./FavoriteButton.module.css";
import React from "react";

interface Props {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
}

const FavoriteButton = React.memo(({ isFavorite, onToggle, size = 28 }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onToggle();
      }}
      className={`${styles.btn} ${isFavorite ? styles.active : ""}`}
      aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
      title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
    >
      <Heart
        size={size}
        className={styles.heartIcon}
        strokeWidth={2.5}
      />
    </button>
  );
});

FavoriteButton.displayName = "FavoriteButton";

export default FavoriteButton;

// Применение
// 1. В любом компоненте (ProductCard, ProductDetails, WishlistItem и т.д.)
// import { useFavorite } from "@/hooks/useFavorite";
// import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";

// export default function ProductCard({ product }) {
//   // 2. Одна строка — вся логика избранного
//   const { isFavorite, toggle } = useFavorite(product.id);

//   // 3. Ещё одна строка — чистый UI
//   return (
//     <div className={styles.card}>
//       {/* ... остальной контент */}

//       <div className={styles.actions}>
//         <FavoriteButton isFavorite={isFavorite} onToggle={toggle} />
//         <AddToCartButton product={product} />
//       </div>
//     </div>
//   );
// }