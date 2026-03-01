
// src/hooks/useProducts.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types/Product";
import { fetchAllProducts } from "../api/fetchAllProducts";

const PRODUCTS_PER_PAGE = 40;

export const useProducts = (page: number = 1) => {
  // ИСПРАВЛЕНИЕ: Используем queryResult для хранения результата useQuery
  const queryResult = useQuery({
    queryKey: ["all-products"],
    queryFn: fetchAllProducts,
    staleTime: Infinity, // данные не устаревают
    // cacheTime: Infinity,
  });

  // ИСПРАВЛЕНИЕ: Используем queryResult.data
  const products = queryResult.data || []; 
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginated = products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return {
    ...queryResult, // Распространяем свойства из queryResult (isLoading, error и т.д.)
    data: paginated, // Перезаписываем data пагинированными данными
    allProducts: products,
    totalPages,
    currentPage: page,
  };
};

// Для обновления товара (например, при добавлении в избранное/корзину)
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return (updatedProduct: Product) => {
    queryClient.setQueryData<Product[]>(["all-products"], (old = []) =>
      old.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };
};



// // src/hooks/useProducts.ts — ИСПРАВЛЕННАЯ ВЕРСИЯ
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { fetchAllProducts } from "../api/products";
// import { Product } from "../types";

// const PRODUCTS_PER_PAGE = 12;

// export const useProducts = (page: number = 1) => {
//   const query = useQuery({
//     queryKey: ["all-products"],
//     queryFn: fetchAllProducts,
//     staleTime: Infinity,
//     cacheTime: Infinity,
//   });

//   const products = query.data || [];
//   const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
//   const paginated = products.slice(
//     (page - 1) * PRODUCTS_PER_PAGE,
//     page * PRODUCTS_PER_PAGE
//   );

//   return {
//     ...query,
//     data: paginated,
//     allProducts: products,
//     totalPages,
//     currentPage: page,
//   };
// };

// // Для обновления одного товара (например, при добавлении в избранное)
// export const useUpdateProduct = () => {
//   const queryClient = useQueryClient();
//   return (updatedProduct: Product) => {
//     queryClient.setQueryData<Product[]>(["all-products"], (old = []) =>
//       old.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
//     );
//   };
// };
