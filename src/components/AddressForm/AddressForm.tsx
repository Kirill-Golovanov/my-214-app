import type { ChangeEvent } from 'react';


interface AddressFormProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export default function AddressForm({ value, onChange, onNext }: AddressFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <label>
        Адрес доставки:
        <input
          type="text"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          required
        />
      </label>
      <button type="submit">Далее</button>
    </form>
  );
}
