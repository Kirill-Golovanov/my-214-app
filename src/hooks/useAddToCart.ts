// src/hooks/useAddToCart.ts
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
// import type { RootState } from "../app/store";
// import { addToCart } from "../features/cart/cartSlice";
// import type { Product } from "../types/Product";
import type { RootState } from "@/app/store";
import type { Product } from "@/types/Product";
import { addToCart } from "@/features/cart/cartSlice";

// src/hooks/useAddToCart.ts
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addToCart } from "@/features/cart/cartSlice";
// import toast from "react-hot-toast";
// import type { RootState } from "@/app/store";
// import type { Product } from "@/types/Product";

export function useAddToCart(product: Product) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInCart = useSelector(
    (state: RootState) =>
      Array.isArray(state.cart?.items) &&
      state.cart.items.some((item: Product) => item?.id === product.id)
  );

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(addToCart(product));

    toast.success("Добавлено в корзину!", { duration: 1800 });

    // ─────── КРАСИВАЯ ЛЕТАЮЩАЯ КОРЗИНКА — ФИНАЛЬНАЯ ВЕРСИЯ ───────
    const animateFly = () => {
      const cartIcon = document.querySelector(
        "[data-cart-icon]"
      ) as HTMLElement;
      if (!cartIcon) return;

      const button = e.currentTarget;
      const buttonRect = button.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      const startX = buttonRect.left + buttonRect.width / 2;
      const startY = buttonRect.top + buttonRect.height / 2;
      const endX = cartRect.left + cartRect.width / 2;
      const endY = cartRect.top + cartRect.height / 2;

      const flyer = document.createElement("div");
      flyer.innerHTML = `
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5">
          <path d="M1 1h4l2.5 13.5a2 2 0 0 0 2 1.5h10a2 2 0  0 2-1.5L23 6H6"/>
          <circle cx="8" cy="21" r="1.5"/>
          <circle cx="19" cy="21" r="1.5"/>
        </svg>
      `;

      const svg = flyer.firstElementChild as HTMLElement;

      Object.assign(svg.style, {
        position: "fixed",
        left: `${startX - 21}px`,
        top: `${startY - 21}px`,
        width: "42px",
        height: "42px",
        pointerEvents: "none",
        zIndex: "9999",
        opacity: "1",
        transform: "translate(0px, 0px) scale(1)",
        transition: "none",
      });

      document.body.appendChild(svg);

      // Фиксируем начальное состояние
      svg.getBoundingClientRect();

      requestAnimationFrame(() => {
        svg.style.transition =
          "transform 0.9s cubic-bezier(0.2, 0.8, 0.4, 1), opacity 0.6s ease-out";
        svg.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0.2)`;
        svg.style.opacity = "0";
      });

      svg.addEventListener("transitionend", () => svg.remove(), { once: true });
    };

    // Запускаем анимацию
    animateFly();
  };

  const goToCart = () => navigate("/cart");

  return { isInCart, handleAdd, goToCart };
}