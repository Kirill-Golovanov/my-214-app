// src/components/Loader.tsx
import { createPortal } from "react-dom";
import styles from "./ExtraLoader.module.css";

export default function ExtraLoader() {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.loader}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>
    </div>,
    document.body
  );
}
