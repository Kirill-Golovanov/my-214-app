// // src/pages/CartPage.tsx
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { ShoppingCart } from "lucide-react";
// import styles from "./CartPage.module.css";
// import type { RootState } from "../../app/store";
// import { clearCart, removeFromCart, updateQuantity } from "../../features/cart/cartSlice";

// export default function CartPage() {
//   const dispatch = useDispatch();
//   const items = useSelector((state: RootState) => state.cart.items);

//   const totalPrice = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   if (items.length === 0) {
//     return (
//       <div className={styles.empty}>
//         <ShoppingCart size={80} />
//         <h2>Корзина пуста</h2>
//         <Link to="/products" className={styles.link}>
//           Перейти к покупкам
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <h1>Корзина</h1>
//       <div className={styles.list}>
//         {items.map((item) => (
//           <div key={item.id} className={styles.item}>
//             <img src={item.image} alt={item.title} />
//             <div className={styles.info}>
//               <h3>{item.title}</h3>
//               <p>${item.price}</p>
//             </div>
//             <div className={styles.controls}>
//               <button
//                 onClick={() =>
//                   dispatch(
//                     updateQuantity({ id: item.id, quantity: item.quantity - 1 })
//                   )
//                 }
//               >
//                 −
//               </button>
//               <span>{item.quantity}</span>
//               <button
//                 onClick={() =>
//                   dispatch(
//                     updateQuantity({ id: item.id, quantity: item.quantity + 1 })
//                   )
//                 }
//               >
//                 +
//               </button>
//             </div>
//             <button
//               onClick={() => dispatch(removeFromCart(item.id))}
//               className={styles.remove}
//             >
//               Удалить
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className={styles.summary}>
//         <p>
//           Итого: <strong>${totalPrice.toFixed(2)}</strong>
//         </p>
//         <button onClick={() => dispatch(clearCart())} className={styles.clear}>
//           Очистить корзину
//         </button>
//       </div>
//     </div>
//   );
// }



// src/pages/CartPage.tsx
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductsListForCart, { type CartItem } from "@/components/ProductsListForCart/ProductsListForCart";
import { clearCart } from "@/features/cart/cartSlice";
import styles from "./CartPage.module.css";
import type { RootState } from "@/app/store";


export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const totalPrice = items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Корзина</h1>

      {/* Переиспользуемый компонент */}
      <ProductsListForCart items={items} />

      {items.length > 0 && (
        <div className={styles.summary}>
          <div className={styles.total}>
            <span>Итого:</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <div className={styles.actions}>
            <button onClick={() => dispatch(clearCart())} className={styles.clearBtn}>
              Очистить корзину
            </button>
            <Link to="/checkout" className={styles.checkoutBtn}>
              Оформить заказ →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}