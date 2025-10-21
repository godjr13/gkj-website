"use client";
import { useEffect, useRef } from "react";
import styles from "./BriefDescription.module.css";

export default function BriefDescription() {
  // Removed lineRef and lastVibrateRef as they are no longer needed
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // all slide items
    const items = Array.from(section.querySelectorAll("[data-slide]"));

    // IntersectionObserver -> reveal when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          } else {
          // 2. REMOVE: Item is leaving view, reset its state (hides it for the next slide-in).
          entry.target.classList.remove(styles.visible);
        }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.container}>
      <div className={styles.grid}>
        {/* LEFT COLUMN */}
        <div className={styles.column}>
          <div data-slide className={`${styles.item} ${styles.fromLeft}`} style={{ backgroundImage: "url('item-background.jpg')"}}>
            <h2 className={styles.item_header}>Our Shop</h2>
            <p className={styles.text_padded}>High-quality guitars & accessories crafted with passion.</p>
          </div>

          <div data-slide className={`${styles.item} ${styles.fromLeft}`} style={{ backgroundImage: "url('item-background.jpg')"}}>
            <h2 className={styles.item_header}>Custom Builds</h2>
            <p className={styles.text_padded}>Tailored instruments built to your playing style.</p>
          </div>
        </div>

        {/* Removed CENTER: vibrating string column entirely */}

        {/* RIGHT COLUMN */}
        <div className={styles.column}>
          <div data-slide className={`${styles.item} ${styles.fromRight}`} style={{ backgroundImage: "url('item-background.jpg')"}}>
            <h2 className={styles.item_header}>Research & Development</h2>
            <p className={styles.text_padded}> Endless pursuit of musical perfection</p>
          </div>

          <div data-slide className={`${styles.item} ${styles.fromRight}`} style={{ backgroundImage: "url('item-background.jpg')"}}>
            <h2 className={styles.item_header}>Community</h2>
            <p className={styles.text_padded}>Events, jams, and a place to share your progress.</p>
          </div>
        </div>
      </div>
    </section>
  );
}