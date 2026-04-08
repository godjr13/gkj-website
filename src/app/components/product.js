"use client";
import Image from "next/image";
import styles from "./product.module.css";

export default function Product() {
    return (
        <div className={styles.product}>
            <div className={styles.card}>
                <div className={styles.wrapper}>
                    <Image
                        src="/Sample.png"
                        alt="Contact header"
                        width={200}
                        height={200}
                        priority
                        className={styles.image}
                    />
                </div>
                <h3 className={styles.itemName}>Sample Item</h3>
                <button className={styles.addToCart}>Add to cart</button>
            </div>
        </div>
    );
}