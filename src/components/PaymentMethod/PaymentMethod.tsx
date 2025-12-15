type PaymentMethodProps = {
  selected: 'card' | 'cash' | null;
  onChange: (method: 'card' | 'cash') => void;
  onBack: () => void;
  onNext: () => void;
};

export const PaymentMethod = ({ selected, onChange, onBack, onNext } : PaymentMethodProps) => {
  return (
    <div className="payment-method">
      <label className="method-option">
        <input
          type="radio"
          name="paymentMethod"
          checked={selected === 'card'}
          onChange={() => onChange('card')}
          aria-label="Оплата картой"
        />
        Карта
      </label>

      <label className="method-option">
        <input
          type="radio"
          name="paymentMethod"
          checked={selected === 'cash'}
          onChange={() => onChange('cash')}
          aria-label="Оплата наличными"
        />
        Наличные
      </label>

      <div className="navigation-buttons">
        <button type="button" onClick={onBack} className="back-button">
          Назад
        </button>
        <button type="button" onClick={onNext} className="next-button">
          Далее
        </button>
      </div>
    </div>
  );
};
