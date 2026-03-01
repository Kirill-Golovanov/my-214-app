// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import { Product } from "@/app/types/Product";
// import styles from "./ProductDetails.module.css";

// interface ProductDetailsProps {
//   product: Product;
// }

// const ProductDetails = ({ product }: ProductDetailsProps) => {
//   const imageSrc =
//     product.images && product.images.length > 0 ? product.images[0] : "";

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>

//         <Link href="/products" className={styles.backLink}>
//           <ArrowLeft size={20} />
//           Назад к товарам
//         </Link>

//         <div className={styles.content}>

//           <div className={styles.imageWrapper}>
//             {imageSrc ? (
//               <Image
//                 src={imageSrc}
//                 alt={product.title}
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 className={styles.image}
//                 priority={false}
//               />
//             ) : (
//               <div className={styles.placeholder}>
//                 <span>Изображение недоступно</span>
//               </div>
//             )}
//           </div>

//           <div className={styles.info}>
//             <h2 className={styles.title}>{product.title}</h2>

//             <div className={styles.price}>${product.price.toFixed(2)}</div>

//             <div className={styles.description}>{product.description}</div>

//             <div className={styles.category}>
//               <span>Категория:</span> {product.category}
//             </div>

//             <div className={styles.reviewsSection}>
//               <h3>Отзывы</h3>
//               {product.reviews && product.reviews.length > 0 ? (
//                 product.reviews.map((review, index) => (
//                   <div key={index} className={styles.review}>
//                     <div className={styles.reviewRating}>
//                       Рейтинг: {review.rating}/5
//                     </div>
//                     <p className={styles.reviewComment}>{review.comment}</p>
//                     <small>
//                       Автор: {review.reviewerName} ({review.reviewerEmail}) |
//                       Дата: {review.date}
//                     </small>
//                   </div>
//                 ))
//               ) : (
//                 <p>Пока нет отзывов.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default  ProductDetails;



// src/components/ProductDetails/ProductDetails.tsx

// "use client"; // Эта директива не нужна в приложении на Vite

// // Импортируем Link из react-router-dom вместо next/link
// import { Link } from "react-router-dom"; 
// import { ArrowLeft } from "lucide-react";
// // Убедитесь, что путь к типу Product корректный для вашей структуры Vite


// import styles from "./ProductDetails.module.css";
// import type { Product } from "../../types/Product";

// interface ProductDetailsProps {
//   product: Product;
// }

// const ProductDetails = ({ product }: ProductDetailsProps) => {
//   const imageSrc =
//     product.images && product.images.length > 0 ? product.images[0] : "";

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         {/* Используем Link из react-router-dom */}
//         <Link to="/products" className={styles.backLink}>
//           <ArrowLeft size={20} />
//           Назад к товарам
//         </Link>

//         <div className={styles.content}>
//           <div className={styles.imageWrapper}>
//             {imageSrc ? (
//               // Используем стандартный тег img вместо Image из next/image
//               <img
//                 src={imageSrc}
//                 alt={product.title}
//                 width={500} // Если нужно указать конкретные размеры в стилях или здесь
//                 height={500}
//                 className={styles.image}
//               />
//             ) : (
//               <div className={styles.placeholder}>
//                 <span>Изображение недоступно</span>
//               </div>
//             )}
//           </div>

//           <div className={styles.info}>
//             <h2 className={styles.title}>{product.title}</h2>

//             <div className={styles.price}>${product.price.toFixed(2)}</div>

//             <div className={styles.description}>{product.description}</div>

//             <div className={styles.category}>
//               <span>Категория:</span> {product.category}
//             </div>

//             <div className={styles.reviewsSection}>
//               <h3>Отзывы</h3>
//               {/* Проверяем наличие отзывов перед маппингом */}
//               {product.reviews &&
//               Array.isArray(product.reviews) &&
//               product.reviews.length > 0 ? (
//                 product.reviews.map((review, index) => (
//                   <div key={index} className={styles.review}>
//                     <div className={styles.reviewRating}>
//                       Рейтинг: {review.rating}/5
//                     </div>
//                     <p className={styles.reviewComment}>{review.comment}</p>
//                     <small>
//                       Автор: {review.reviewerName} ({review.reviewerEmail}) |
//                       Дата: {review.date}
//                     </small>
//                   </div>
//                 ))
//               ) : (
//                 <p>Пока нет отзывов.</p>
//               )}
//             </div>

//             <div className={styles.reviewsSection}>
//               <h3>Отзывы</h3>
//               {product.reviews && product.reviews.length > 0 ? (
//                 product.reviews.map((review, index) => (
//                   <div key={index} className={styles.review}>
//                     <div className={styles.reviewRating}>
//                       Рейтинг: {review.rating}/5
//                     </div>
//                     <p className={styles.reviewComment}>{review.comment}</p>
//                     <small>
//                       Автор: {review.reviewerName} ({review.reviewerEmail}) |
//                       Дата: {review.date}
//                     </small>
//                   </div>
//                 ))
//               ) : (
//                 <p>Пока нет отзывов.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;



// src/components/ProductDetails/ProductDetails.tsx — только отображение
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import FavoriteButton from "../FavoriteButton/FavoriteButton";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import styles from "./ProductDetails.module.css";
import type { Product } from "../../types/Product";
import { useFavorite } from "../../hooks/useFavorite";

import { useAddToCart } from "../../hooks/useAddToCart";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = [...(product.images || []), product.image].filter(
    Boolean
  ) as string[];
  const currentImage = images[selectedImageIndex] || images[0];
  const { isFavorite, toggle } = useFavorite(product.id);
  const { isInCart, handleAdd, goToCart } = useAddToCart(product); // ← весь продукт!

  return (
    <>
      <Link to="/products" className={styles.back}>
        <ArrowLeft size={20} /> Назад к товарам
      </Link>

      <div className={styles.grid}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img
              src={currentImage}
              alt={product.title}
              className={styles.mainImg}
            />
          </div>

          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((img, i) => (
                <button
                aria-label="кнопка переключения изображения"

                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`${styles.thumb} ${i === selectedImageIndex ? styles.active : ""}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.reviewsSection}>
            // <h3>Отзывы</h3>
            //{" "}
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className={styles.review}>
                  <div className={styles.reviewRating}>
                    Рейтинг: {review.rating}/5
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                  <small>
                    Автор: {review.reviewerName} ({review.reviewerEmail}) |
                    Дата: {review.date}
                  </small>
                </div>
              ))
            ) : (
              <p>Пока нет отзывов.</p>
            )}
          </div>

          <div className={styles.actions}>
            <AddToCartButton
              isInCart={isInCart}
              onClick={isInCart ? goToCart : handleAdd}
            />

            <FavoriteButton isFavorite={isFavorite} onToggle={toggle} />
          </div>
        </div>
      </div>
    </>
  );
}