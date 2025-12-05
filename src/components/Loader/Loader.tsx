// src/components/Loader.tsx
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader} aria-label="Загрузка...">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={styles.particle}
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
