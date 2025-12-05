// src/components/ProductCard/ProductCard.tsx
import { Link } from "react-router-dom";
import {useState } from "react";
import styles from "./ProductCardWithSlider.module.css";
import type { Product } from "../../types/Product";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { useFavorite } from "../../hooks/useFavorite";
import { useAddToCart } from "../../hooks/useAddToCart";

interface Props {
  product: Product;
}

export default function ProductCardWithSlider({ product }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const { isFavorite, toggle } = useFavorite(product.id);
 const { isInCart, handleAdd, goToCart } = useAddToCart(product); // ← весь продукт!

  // Все доступные изображения
  const images = [
    ...(product.images || []),
    product.image, // добавляем основное, если его нет в массиве
  ].filter(Boolean) as string[];

  // Если фото нет вообще — заглушка
  const hasImages = images.length > 0;
  const displayImages = hasImages ? images : ["/placeholder.png"];

  return (
    <div
      className={styles.card}
      onMouseLeave={() => setHoveredIndex(0)} // при уходе — назад на главное
    >
      <Link to={`/products/${product.id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          {/* Основное изображение + слайдер при hover */}
          <div className={styles.gallery}>
            {displayImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`${product.title} ${index + 1}`}
                className={styles.galleryImage}
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  transform:
                    hoveredIndex === index
                      ? "scale(1.06)"
                      : "scale(1)",
                }}
                loading="lazy"
              />
            ))}
          </div>

          {/* Маленькие превьюшки снизу (появляются при hover) */}
          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((src, index) => (
                <button  type="button"
                aria-label="Просмотр изображения "
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`${styles.thumb} ${
                    hoveredIndex === index ? styles.thumbActive : ""
                  }`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
        </div>
      </Link>

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