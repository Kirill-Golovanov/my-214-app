// src/components/ProductsListForCart/ProductsListForCart.tsx
import { useDispatch } from "react-redux";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import styles from "./ProductsListForCart.module.css";
import { removeFromCart, updateQuantity } from "@/features/cart/cartSlice";
import type { Product } from "@/types/Product";


export interface CartItem extends Product {
  quantity: number;
}

export interface ProductsListForCartProps {
  items: CartItem[];
}

export default function ProductsListForCart({
  items,
}: ProductsListForCartProps) {
  const dispatch = useDispatch();
  

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <ShoppingCart size={80} className={styles.icon} />
        <h2 className={styles.title}>Корзина пуста</h2>
        <p className={styles.text}>Добавьте товары из каталога</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {items.map((item) => {
        const imageSrc = item.images?.[0] || item.image || "/placeholder.png";

        return (
          <div key={item.id} className={styles.item}>
            <div className={styles.contentWrapper}>
              {/* Изображение */}
              <img
                src={imageSrc}
                alt={item.title}
                className={styles.image}
                loading="lazy"
              />

              {/* Информация */}
              <div className={styles.info}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                {/* <p className={styles.price}>${item.price.toFixed(2)}</p> */}
              </div>
            </div>

            <div className={styles.controlsWrapper}>
              {/* Управление количеством */}
              <div className={styles.controls}>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                  className={styles.controlBtn}
                  disabled={item.quantity <= 1}
                  aria-label="Уменьшить количество"
                >
                  <Minus size={18} strokeWidth={2.5} />
                </button>

                <span className={styles.quantity}>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                  className={styles.controlBtn}
                  aria-label="Увеличить количество"
                >
                  <Plus size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Итоговая цена */}
              <div className={styles.total}>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            </div>

            {/* Удаление */}
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className={styles.removeBtn}
              aria-label="Удалить из корзины"
            >
              <Trash2 size={20} strokeWidth={2.2} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
