// SearchBar.tsx
import { Search, X } from "lucide-react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  search,
  setSearch,
  placeholder = "Поиск товаров...",
}: SearchBarProps) {
  return (
    <div className={styles.searchWrapper}>
      <Search className={styles.searchIcon} size={20} />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
        aria-label="Поиск по магазину"
      />
      {/* Кнопка очистки (появляется при вводе) */}
      {search && (
        <button
        type="button"
          onClick={() => setSearch("")}
          className={styles.clearBtn}
          aria-label="Очистить поиск"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
