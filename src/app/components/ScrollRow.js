"use client";
import { useRef } from "react";
import styles from "./ScrollRow.module.css";

export default function ScrollRow({ title, children }) {
    const trackRef = useRef(null);
    const scroll = (dir) => {
        trackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
    };

    return (
        <div className={styles.row}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <div className={styles.track_wrapper}>
                <button className={`${styles.arrow_btn} ${styles.left}`} onClick={() => scroll(-1)}>←</button>
                <div className={styles.track} ref={trackRef}>
                    {children}
                </div>
                <button className={`${styles.arrow_btn} ${styles.right}`} onClick={() => scroll(1)}>→</button>
            </div>
        </div>
    );
}