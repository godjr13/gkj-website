"use client"

import styles from "./page.module.css"
import Product from "@components/product.js"
import { useRef } from "react";
import ScrollRow from "@components/ScrollRow.js";

export default function page() {

    const trackRef = useRef(null);

    const scroll = (dir) => {
        trackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
    };

    return (
        <div className={styles.shop_page}>
            <ScrollRow title="Amps">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </ScrollRow>

            <ScrollRow title="Guitars">
                <Product />
                <Product />
                <Product />
            </ScrollRow>

            <ScrollRow title="Pedals">
                <Product />
                <Product />
                <Product />
                <Product />
            </ScrollRow>
        </div>
    );
}