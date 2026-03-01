// __________________________________________________
// Получает продукт по ID из API
// ___________________________________________________

import axios from "axios";
import type { Product } from "../types/Product";


export async function fetchProductById(id: number): Promise<Product> {
  try {
    const response = await axios.get<Product>(
      `https://dummyjson.com/products/${id}`,
      {
        timeout: 8000,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`Товар с ID ${id} не найден`);
      }

      if (error.code === "NETWORK_ERROR" || !navigator.onLine) {
        throw new Error("Нет подключения к интернету");
      }

      console.error("Ошибка сети при загрузке товара:", {
        id,
        status: error.response?.status,
        message: error.message,
      });

      throw new Error("Не удалось загрузить товар. Попробуйте позже.");
    }

    console.error("Неизвестная ошибка в fetchProductById:", error);
    throw new Error("Произошла внутренняя ошибка приложения");
  }
}
