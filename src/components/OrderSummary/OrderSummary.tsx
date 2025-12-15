export default function OrderSummary(
//     {
// //   items,
// //   totalPrice,
// //   address,
// //   paymentMethod,
// }


) {
  return (
    <div>
      <h2>Подтверждение заказа</h2>
      {/* <p>
        <strong>Адрес:</strong> {address}
      </p>
      <p>
        <strong>Способ оплаты:</strong>{" "}
        {paymentMethod === "card" ? "Картой" : "Наличными"}
      </p> */}
      {/* <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} — {item.quantity} × {item.price} ₽
          </li>
        ))}
      </ul> */}
      {/* <p>
        <strong>Итого:</strong> {totalPrice.toFixed(2)} ₽
      </p> */}
      <button>Подтвердить заказ</button>
    </div>
  );
}
