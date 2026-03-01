// ProductCard.tsx
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

import type { Product } from "../../types/Product";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { useFavorite } from "../../hooks/useFavorite";
import { useAddToCart } from "../../hooks/useAddToCart";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  // Безопасно берём изображение: images[0] → image → заглушка
  const imageSrc = product.images?.[0] || product.image || "/placeholder.png";

  const { isFavorite, toggle } = useFavorite(product.id);
  const { isInCart, handleAdd, goToCart } = useAddToCart(product); // ← весь продукт!

  return (
    <div className={styles.card}>
      {/* Кликабельная часть — только фото + название + цена */}
      <Link to={`/products/${product.id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          {imageSrc && imageSrc !== "placeholder.png" ? (
            <img
              src={imageSrc}
              alt={product.title}
              className={styles.image}
              loading="lazy"
            />
          ) : (
            <div className={styles.placeholder}>
              <span>Нет фото</span>
            </div>
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
        </div>
      </Link>

      {/* Кнопки НЕ внутри Link — клик по ним не открывает товар */}
      <div className={styles.actions}>
        <FavoriteButton isFavorite={isFavorite} onToggle={toggle} />
        <AddToCartButton
          isInCart={isInCart}
          onClick={isInCart ? goToCart : handleAdd}
        />
      </div>
    </div>
  );
}

export default ProductCard;
