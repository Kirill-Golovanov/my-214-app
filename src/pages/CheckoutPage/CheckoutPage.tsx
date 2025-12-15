// import { useState, useEffect } from "react";
// import { useAppSelector } from "@/app/hooks";
// import { selectCartItems, selectTotalPrice } from "@/features/cart/cartSlice";
import styles from "./CheckoutPage.module.css";
// import AddressForm from "@/components/AddressForm/AddressForm";
// import PaymentMethod from "@/components/PaymentMethod/PaymentMethod";
// import OrderSummary from "@/components/OrderSummary/OrderSummary";


export default function CheckoutPage() {
//   const items = useAppSelector(selectCartItems);
//   const totalPrice = useAppSelector(selectTotalPrice);

//   const [step, setStep] = useState<1 | 2 | 3>(1);
//   const [address, setAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");

//   // Если корзина пуста — показываем сообщение
//   useEffect(() => {
//     if (items.length === 0) {
//       alert("Ваша корзина пуста! Добавьте товары перед оформлением заказа.");
//       // Можно перенаправить: window.location.href = '/';
//     }
//   }, [items]);

//   if (items.length === 0) return null;

//   const handleNext = () => setStep(step + 1);
//   const handlePrev = () => setStep(step - 1);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Оформление заказа</h1>

      {/* Шаги оформления */}
      {/* <div className={styles.steps}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ""}`}>
          1. Адрес
        </div>
        <div className={`${styles.step} ${step >= 2 ? styles.active : ""}`}>
          2. Оплата
        </div>
        <div className={`${styles.step} ${step === 3 ? styles.active : ""}`}>
          3. Подтверждение
        </div>
      </div> */}

      {/* {step === 1 && (
        <AddressForm
          value={address}
          onChange={setAddress}
          onNext={handleNext}
        />
      )}

      {step === 2 && (
        <PaymentMethod
          selected={paymentMethod}
          onChange={setPaymentMethod}
          onBack={handlePrev}
          onNext={handleNext}
        />
      )}

      {step === 3 && (
        <OrderSummary
          items={items}
          totalPrice={totalPrice}
          address={address}
          paymentMethod={paymentMethod}
        />
      )} */}
    </div>
  );
}
