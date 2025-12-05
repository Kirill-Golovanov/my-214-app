// src/api/products.ts

// import type { Product } from "../types/Product";


// export const fetchAllProducts = async (): Promise<Product[]> => {
//   const res = await fetch("https://fakestoreapi.com/products");
//   if (!res.ok) throw new Error("Failed to fetch products");
//   return res.json();
// };



// __________________________________________________
// Использование API DummyJSON
// один раз загрузить ВСЕ товары (194 шт.)
// хранить ВСЕ товары в React Query
// под ключом ["all-products"] и виртуальная пагинация
// Нет проблем с удалением/добавлением — всё в одном массиве
// Мгновенная фильтрация, поиск, пагинация
// Удаление и добавление товаров
// ___________________________________________________

import axios from "axios";
import type { Product } from "../types/Product";


export interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<ApiResponse>(
      "https://dummyjson.com/products?limit=0"
    );
    return response.data.products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        !navigator.onLine ||
        error.code === "NETWORK_ERROR" ||
        error.message.includes("Network Error")
      ) {
        console.error("Нет подключения к интернету", error);
        throw new Error("Нет подключения к интернету. Проверьте соединение.");
      }

      if (error.response?.status && error.response.status >= 500) {
        console.error("Сервер DummyJSON недоступен", error.response.status);
        throw new Error("Сервис временно недоступен. Попробуйте позже.");
      }

      console.error("Ошибка API при загрузке товаров:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw new Error(
        "Не удалось загрузить товары. Попробуйте обновить страницу."
      );
    }

    console.error("Критическая ошибка в fetchAllProducts:", error);
    throw new Error("Произошла внутренняя ошибка приложения.");
  }
}
