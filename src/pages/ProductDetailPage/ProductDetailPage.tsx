// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";


// import styles from "./ProductDetailPage.module.css";
// import { fetchProductById } from "../../api/fetchProductById";
// import ProductDetails from "../../components/ProductDetails/ProductDetails";

// // const OVERRIDES_KEY = "productOverrides";

// const ProductDetailPage = () => {
//   // const { id } = useParams();
//   // const productId = Number(id);
//   // const router = useRouter();

//   // // Сначала ищем в своих товарах (Redux)
//   // // const localProduct = useSelector((state: RootState) =>
//   // //   state.products.products.find((p) => p.id === productId)
//   // // );

//   // // Если не свой — грузим с API
//   // const {
//   //   data: apiProduct,
//   //   isLoading,
//   //   error,
//   // } = useQuery({
//   //   queryKey: ["product", productId],
//   //   queryFn: () => fetchProductById(productId),
//   //   enabled: !localProduct && productId <= 1000,
//   //   staleTime: 5 * 60 * 1000,
//   //   retry: 1,
//   // });

//   // // Применяем переопределения из localStorage (редактирование API-товара)
//   // const overriddenProduct = apiProduct
//   //   ? (() => {
//   //       try {
//   //         const overrides = JSON.parse(
//   //           localStorage.getItem(OVERRIDES_KEY) || "{}"
//   //         );
//   //         return overrides[productId]
//   //           ? { ...apiProduct, ...overrides[productId] }
//   //           : apiProduct;
//   //       } catch {
//   //         return apiProduct;
//   //       }
//   //     })()
//   //   : null;

//   // const product = localProduct || overriddenProduct || apiProduct;

//   // // Если товар не найден — уходим на список
//   // if (!isLoading && !product) {
//   //   router.replace("/products");
//   //   return null;
//   // }

//   return (
//     <div className={styles.container}>
//       {isLoading && <div className={styles.loading}>Загрузка товара...</div>}

//       {error && <div className={styles.error}>Не удалось загрузить товар</div>}

//       {product && !isLoading && <ProductDetails product={product} />}
//     </div>
//   );
// };

// export default ProductDetailPage;



// // src/pages/ProductDetailPage.tsx (или src/components/ProductDetailPage/ProductDetailPage.tsx)
// import { useQuery } from "@tanstack/react-query";
// import { useParams, useNavigate } from "react-router-dom"; // Хуки из react-router-dom

// import styles from "./ProductDetailPage.module.css";
// import { fetchProductById } from "../../api/fetchProductById";
// import ProductDetails from "../../components/ProductDetails/ProductDetails";
// import type { Product } from "../../types/Product"; // Используем ваш тип Product

// const ProductDetailPage = () => {
//   // useParams() из react-router-dom возвращает объект параметров URL.
//   // Например, если URL = /products/101, то params.id будет строкой "101".
//   const params = useParams<{ id: string }>(); 
//   const productId = Number(params.id);
//   const navigate = useNavigate(); // Хук для навигации

//   // Используем React Query для получения конкретного товара по ID
//   const {
//     data: product,
//     isLoading,
//     isError,
//   } = useQuery<Product>({
//     queryKey: ["product", productId], 
//     queryFn: () => fetchProductById(productId),
//     enabled: !!productId && !isNaN(productId), // Проверка на валидный ID
//     staleTime: 5 * 60 * 1000, 
//     retry: 1, 
//   });

//   // Обработка ошибки загрузки (например, 404 Not Found)
//   if (isError) {
//     // Перенаправляем пользователя на страницу списка товаров или 404
//     navigate("/products"); 
//     return null; 
//   }
  
//   // Отображение состояния загрузки
//   if (isLoading) {
//     return (
//         <div className={styles.container}>
//             <div className={styles.loading}>Загрузка товара...</div>
//         </div>
//     );
//   }

//   // Если товар успешно загружен, но по какой-то причине оказался пустым
//   if (!product) {
//       navigate("/products");
//       return null;
//   }
  

//   // Основной рендер, когда данные готовы
//   return (
//     <div className={styles.container}>
//       {/* Предполагается, что ProductDetails принимает объект product */}
//       <ProductDetails product={product} /> 
//     </div>
//   );
// };

// export default ProductDetailPage;


// // src/pages/ProductDetailPage.tsx
// import { useParams, Link } from "react-router-dom";
// import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";

// import styles from "./ProductDetailPage.module.css";
// import type { RootState } from "../../app/store";
// import { useProducts } from "../../hooks/useProducts";
// import { addToCart } from "../../features/cart/cartSlice";
// import { toggleFavorite } from "../../features/favorites/favoritesSlice";

// export default function ProductDetailPage() {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useDispatch();
//   const favorites = useSelector((state: RootState) => state.favorites);
//   const { allProducts, isLoading } = useProducts();

//   const product = allProducts.find((p) => p.id === Number(id));

//   // if (isLoading) return <Loader />;
// if (isLoading) return <div>Загрузка</div>;

//   if (!product) return <div>Товар не найден</div>;

//   const isFavorite = favorites.includes(product.id);

//   return (


    
//     <div className={styles.container}>
//       <Link to="/products" className={styles.back}>
//         <ArrowLeft size={20} /> Назад к товарам
//       </Link>

//       <div className={styles.grid}>
//         <div className={styles.image}>
//           <img src={product.image} alt={product.title} />
//         </div>

//         <div className={styles.info}>
//           <h1 className={styles.title}>{product.title}</h1>
//           <p className={styles.category}>Категория: {product.category}</p>

//           <div className={styles.rating}>
//             ★ {product.rating.rate} ({product.rating.count} отзывов)
//           </div>

//           <p className={styles.price}>${product.price}</p>

//           <p className={styles.description}>{product.description}</p>

//           <div className={styles.actions}>
//             <button
//               onClick={() => dispatch(addToCart(product))}
//               className={styles.addToCart}
//             >
//               <ShoppingCart size={22} />
//               Добавить в корзину
//             </button>

//             <button
//             aria-label="jjj"
//               onClick={() => dispatch(toggleFavorite(product.id))}
//               className={`${styles.favorite} ${isFavorite ? styles.active : ""}`}
//             >
//               <Heart size={22} fill={isFavorite ? "red" : "none"} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// // src/pages/ProductDetailPage.tsx
// import { useParams, Link } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useState } from "react";

// import styles from "./ProductDetailPage.module.css";
// import { useProducts } from "../../hooks/useProducts";
// import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
// import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";

// export default function ProductDetailPage() {
//   const { id } = useParams<{ id: string }>();
//   const { allProducts, isLoading } = useProducts();
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   const product = allProducts.find((p) => p.id === Number(id));

//   if (isLoading) return <div className={styles.loader}>Загрузка...</div>;
//   if (!product) return <div className={styles.notFound}>Товар не найден</div>;

//   // Собираем все изображения: из массива + основное
//   const images = [
//     ...(product.images || []),
//     product.image,
//   ].filter(Boolean) as string[];

//   const currentImage = images[selectedImageIndex] || images[0] || "/placeholder.png";

//   return (
//     <div className={styles.container}>
//       <Link to="/products" className={styles.back}>
//         <ArrowLeft size={20} />
//         Назад к товарам
//       </Link>

//       <div className={styles.grid}>
//         {/* === ГАЛЕРЕЯ === */}
//         <div className={styles.gallery}>
//           {/* Основное изображение */}
//           <div className={styles.mainImage}>
//             <img
//               src={currentImage}
//               alt={product.title}
//               className={styles.mainImg}
//             />
//           </div>

//           {/* Превьюшки снизу */}
//           {images.length > 1 && (
//             <div className={styles.thumbnails}>
//               {images.map((img, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImageIndex(index)}
//                   className={`${styles.thumb} ${
//                     index === selectedImageIndex ? styles.thumbActive : ""
//                   }`}
//                 >
//                   <img src={img} alt="" />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* === ИНФОРМАЦИЯ === */}
//         <div className={styles.info}>
//           <h1 className={styles.title}>{product.title}</h1>
//           <p className={styles.category}>Категория: {product.category}</p>

//           <div className={styles.rating}>
//             ★ {product.rating.rate} ({product.rating.count} отзывов)
//           </div>

//           <p className={styles.price}>${product.price.toFixed(2)}</p>

//           <p className={styles.description}>{product.description}</p>

//           {/* Кнопки — твои компоненты! */}
//           <div className={styles.actions}>
//             <AddToCartButton product={product} size={24} />
//             <FavoriteButton productId={product.id} size={24} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/ProductDetailPage.tsx — только логика загрузки
import { useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import styles from "./ProductDetailPage.module.css";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { allProducts, isLoading, error } = useProducts();

  const product = allProducts.find(p => p.id === Number(id));

  return (
    <div className={styles.container}>
      {isLoading && <div className={styles.loading}>Загрузка...</div>}
      {error && <div className={styles.error}>Ошибка загрузки</div>}
      {!product && !isLoading && <div className={styles.notFound}>Товар не найден</div>}
      {product && <ProductDetails product={product} />}
    </div>
  );
}