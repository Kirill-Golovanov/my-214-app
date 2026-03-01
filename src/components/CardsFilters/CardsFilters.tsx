// CardsFilters.tsx
import styles from "./CardsFilters.module.css";

interface CardsFiltersProps {
  category: string;
  setCategory: (value: string) => void;
  onReset: () => void;
  categories: string[];
}

export default function CardsFilters({
  category,
  setCategory,
  onReset,
  categories,
}: CardsFiltersProps) {
  const hasActiveFilter = category !== "";

  return (
    <div className={styles.filters}>
      {/* Выбор категории */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={styles.select}
        aria-label="Фильтр по категории"
      >
        <option value="">Все категории</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      {/* Кнопка сброса — только если выбрана категория */}
      {hasActiveFilter && (
        <button type="button" onClick={onReset} className={styles.reset}>
          Сбросить
        </button>
      )}
    </div>
  );
}
