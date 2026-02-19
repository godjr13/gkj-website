"use client";
import styles from "./Gallery.module.css";
import Image from "next/image";

export default function BriefDescription() {
    return(
        <div className="gallery">
            <div className="gallery-grid">
                <Image
                    src="/gallery/img1.jpg"
                    width={500}
                    height={500}
                />
                </div>
        </div>
    );
}