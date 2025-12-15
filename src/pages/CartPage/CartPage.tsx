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



// // src/pages/CartPage.tsx
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import ProductsListForCart, { type CartItem } from "@/components/ProductsListForCart/ProductsListForCart";
// import { clearCart } from "@/features/cart/cartSlice";
// import styles from "./CartPage.module.css";
// import type { RootState } from "@/app/store";
// import LoginModal from "@/components/LoginModal/LoginModal";
// import { useRequireAuth } from "@/hooks/useRequireAuth";


// export default function CartPage() {

//   const { showModal, closeModal } = useRequireAuth();


//   const dispatch = useDispatch();
//   const items = useSelector((state: RootState) => state.cart.items);

//   const totalPrice = items.reduce(
//     (sum: number, item: CartItem) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Корзина</h1>

//       {/* Переиспользуемый компонент */}
//       <ProductsListForCart items={items} />

//       {items.length > 0 && (
//         <div className={styles.summary}>
//           <div className={styles.total}>
//             <span>Итого:</span>
//             <strong>${totalPrice.toFixed(2)}</strong>
//           </div>

//           <div className={styles.actions}>
//             <button
//               onClick={() => dispatch(clearCart())}
//               className={styles.clearBtn}
//             >
//               Очистить корзину
//             </button>
//             <Link to="/checkout" className={styles.checkoutBtn}>
//               Оформить заказ →
//             </Link>

//             <LoginModal isOpen={showModal} onClose={closeModal} />
            
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// // src/pages/CartPage/CartPage.tsx
// import { useSelector, useDispatch } from "react-redux";
// import ProductsListForCart, { type CartItem } from "@/components/ProductsListForCart/ProductsListForCart";
// import { clearCart } from "@/features/cart/cartSlice";
// import styles from "./CartPage.module.css";
// import type { RootState } from "@/app/store";
// import { useRequireAuth } from "@/hooks/useRequireAuth";
// import { useAppSelector } from "@/app/hooks";
// import LoginModal from "@/components/LoginModal/LoginModal";


// export default function CartPage() {
//   const dispatch = useDispatch();
//   const items = useSelector((state: RootState) => state.cart.items);
//   const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

//   // Хук управляет модалкой
//   // const { showModal, openModal, closeModal } = useRequireAuth();
//   const { showModal, openModal, closeModal, fromPath } = useRequireAuth();

//   const totalPrice = items.reduce(
//     (sum: number, item: CartItem) => sum + item.price * item.quantity,
//     0
//   );

//   // Клик на "Оформить заказ"
//   const handleCheckoutClick = () => {
//     if (!isAuthenticated) {
//       openModal(); // ← Открываем модалку
//     } else {
//       window.location.href = "/checkout"; // ← Переход на оформление
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Корзина</h1>

//       <ProductsListForCart items={items} />

//       {items.length > 0 && (
//         <div className={styles.summary}>
//           <div className={styles.total}>
//             <span>Итого:</span>
//             <strong>${totalPrice.toFixed(2)}</strong>
//           </div>

//           <div className={styles.actions}>
//             <button
//               onClick={() => dispatch(clearCart())}
//               className={styles.clearBtn}
//             >
//               Очистить корзину
//             </button>

//             <button onClick={handleCheckoutClick} className={styles.checkoutBtn}>
//               Оформить заказ
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Модалка входа */}
//       <LoginModal isOpen={showModal} onClose={closeModal} fromPath={fromPath} />
    
//     </div>
//   );
// }

// src/pages/CartPage/CartPage.tsx
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductsListForCart, { type CartItem } from "@/components/ProductsListForCart/ProductsListForCart";
import { clearCart } from "@/features/cart/cartSlice";
import { useAppSelector } from "@/app/hooks";
import LoginModal from "@/components/LoginModal/LoginModal";

import styles from "./CartPage.module.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items: CartItem[] = useSelector((state: any) => state.cart.items); // типизируй свой RootState правильно
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Управление модалкой входа вручную
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const totalPrice = items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  // Клик на "Оформить заказ"
  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      openLoginModal(); // открываем модалку
    } else {
      navigate("/checkout"); // переходим на оформление
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Корзина</h1>

      {items.length === 0 ? (
        <p className={styles.empty}>Корзина пуста</p>
      ) : (
        <>
          <ProductsListForCart items={items} />

          <div className={styles.summary}>
            <div className={styles.total}>
              <span>Итого:</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>

            <div className={styles.actions}>
              <button
                onClick={() => dispatch(clearCart())}
                className={styles.clearBtn}
              >
                Очистить корзину
              </button>

              <button onClick={handleCheckoutClick} className={styles.checkoutBtn}>
                Оформить заказ
              </button>
            </div>
          </div>
        </>
      )}

      {/* Модалка входа */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
}