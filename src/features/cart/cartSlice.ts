// // src/features/cart/cartSlice.ts
// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { Product } from "../../types/Product";


// interface CartItem extends Product {
//   product: any;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[]; // Массив товаров в корзине с количеством
// }

// const loadCartFromStorage = (): CartItem[] => {
//   try {
//     const stored = localStorage.getItem("cart");
//     return stored ? (JSON.parse(stored) as CartItem[]) : [];
//   } catch (error) {
//     console.warn("Не удалось загрузить корзину из localStorage:", error);
//     return []; // Возвращаем пустую корзину в случае ошибки
//   }
// };

// const saveCartToStorage = (items: CartItem[]) => {
//   try {
//     localStorage.setItem("cart", JSON.stringify(items));
//   } catch (error) {
//     console.warn("Не удалось сохранить корзину в localStorage:", error);
//   }
// };

// const initialState: CartState = {
//   items: loadCartFromStorage(), // Безопасная загрузка из localStorage
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<Product>) => {
//       const existing = state.items.find((i) => i.id === action.payload.id);
//       if (existing) {
//         existing.quantity += 1; // Увеличиваем количество если товар уже есть
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 }); // Добавляем новый товар
//       }
//       saveCartToStorage(state.items); // Сохраняем в localStorage
//     },
//     removeFromCart: (state, action: PayloadAction<number>) => {
//       state.items = state.items.filter((i) => i.id !== action.payload);
//       saveCartToStorage(state.items); // Сохраняем после удаления
//     },
//     updateQuantity: (
//       state,
//       action: PayloadAction<{ id: number; quantity: number }>
//     ) => {
//       const item = state.items.find((i) => i.id === action.payload.id);
//       if (item) {
//         item.quantity = action.payload.quantity;
//         if (item.quantity <= 0) {
//           // Автоматически удаляем товар если количество <= 0
//           state.items = state.items.filter((i) => i.id !== action.payload.id);
//         }
//       }
//       saveCartToStorage(state.items); // Сохраняем после обновления
//     },
//     clearCart: (state) => {
//       state.items = [];
//       localStorage.removeItem("cart"); // Полная очистка из localStorage
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } =
//   cartSlice.actions;
// export default cartSlice.reducer;

// src/features/cart/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/Product";

// CartItem — это Product + quantity
export interface CartItem extends Product {
  quantity: number;
}

// Состояние корзины
interface CartState {
  items: CartItem[];
}

// === Безопасная работа с localStorage ===
const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem("cart");
    if (!stored) return [];
    const parsed = JSON.parse(stored);

    // Защищаемся от битых данных
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is CartItem =>
          typeof item.id === "number" &&
          typeof item.title === "string" &&
          typeof item.price === "number" &&
          typeof item.quantity === "number" &&
          item.quantity > 0
      );
    }
    return [];
  } catch (error) {
    console.warn("Ошибка при загрузке корзины из localStorage:", error);
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (error) {
    console.warn("Ошибка при сохранении корзины в localStorage:", error);
  }
};

// Начальное состояние
const initialState: CartState = {
  items: loadCartFromStorage(),
};

// === Слайс ===
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }

      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
