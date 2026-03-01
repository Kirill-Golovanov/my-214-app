// Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={styles.pagination} aria-label="Пагинация товаров">
      {/* ТЕКСТ — ВСЕГДА ВИДЕН, ДАЖЕ НА МОБИЛКЕ */}
      <span className={styles.note} aria-live="polite">
        Страница <strong>{currentPage}</strong> из <strong>{totalPages}</strong>
      </span>

      <div className={styles.controls}>
        {/* Кнопка "Назад" */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.arrow}
          aria-label="Предыдущая страница"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Цифры — скрываются на маленьких экранах */}
        <div className={styles.pages}>
          {/* Можно оставить логику с ... или просто 1, 2, 3... */}
          {currentPage > 3 && (
            <>
              <button onClick={() => handlePageChange(1)} className={styles.page}>1</button>
              <span className={styles.dots}>...</span>
            </>
          )}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = Math.max(1, currentPage - 2) + i;
            if (page > totalPages) return null;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${styles.page} ${currentPage === page ? styles.active : ""}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
          {currentPage < totalPages - 2 && totalPages > 5 && (
            <>
              <span className={styles.dots}>...</span>
              <button onClick={() => handlePageChange(totalPages)} className={styles.page}>
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Кнопка "Вперёд" */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.arrow}
          aria-label="Следующая страница"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </nav>
  );
}