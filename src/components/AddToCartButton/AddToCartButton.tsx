//AddToCartButton.tsx
import { ShoppingCart, Check } from "lucide-react";
import styles from "./AddToCartButton.module.css";

interface Props {
  isInCart: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AddToCartButton({ isInCart, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${isInCart ? styles.inCart : ""}`}
      aria-label={isInCart ? "Товар в корзине" : "Добавить в корзину"}
    >
      {isInCart ? (
        <>
          <Check size={20} strokeWidth={2.5} />
          <span>В корзине</span>
        </>
      ) : (
        <>
          <ShoppingCart size={20} strokeWidth={2.5} />
          <span>В корзину</span>
        </>
      )}
    </button>
  );
}