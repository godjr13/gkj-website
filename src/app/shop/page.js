"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./page.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  useEffect(() => { fetch("/api/products").then((r) => r.json()).then(setProducts).catch(() => setProducts([])); }, []);
  return <main className="shop-page"><section className="shop-hero"><p className="eyebrow">GKJ PRODUCTIONS / SHOP</p><h1>Built for sound<br />that stays with you.</h1><p>Curated equipment and GKJ essentials for rooms, stages, and the moments between.</p></section><section className="product-grid">{products.length ? products.map((product) => <details className="product-card" key={product.id}><summary>{product.image_url ? <Image src={product.image_url} alt={product.name} width={800} height={600} /> : <div className="product-placeholder" aria-hidden="true">GKJ</div>}<div className="product-copy"><div><p className="eyebrow">{product.category}</p><h2>{product.name}</h2></div><strong>${(product.price / 100).toFixed(2)}</strong></div><span className="stock">{product.inventory > 0 ? `${product.inventory} in stock` : "Currently unavailable"}</span><span className="expand-hint">View details</span></summary><div className="product-details"><p>{product.description || "No description available."}</p>{product.datasheet_url ? <a href={product.datasheet_url} target="_blank" rel="noreferrer">View datasheet PDF</a> : <span className="no-datasheet">Datasheet unavailable</span>}</div></details>) : <p className="empty-shop">The shop is being stocked. Check back soon.</p>}</section></main>;
}
