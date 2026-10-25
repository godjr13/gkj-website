"use client";
import styles from "./page.css";
import { useState } from "react";
import Image from "next/image"

export default function Contact() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "Message sent!" : data.error || "Something went wrong.");
      if (data.success) e.target.reset();
    } catch {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="background">
      <div className="banner">
      <Image
        src="/contact-header.png"
        alt="Contact header"
        fill
        priority
        className="banner-img"
      />
      </div>

      <div className="contact">
        <div className="contact-page-header">
          <h1 className="getintouch">Get In Touch</h1>
          <p>You’re not here for ordinary sound - and neither are we.
            Whether you're chasing pristine clarity, controlled chaos, warm analog character, or stage-shaking power, we build equipment that delivers with precision and intent. Every project starts with understanding your needs, your space, and the way you experience music.</p>
            
            <div className="mail">
              <img width="48" height="48" src="https://img.icons8.com/pulsar-gradient/48/new-post.png" alt="new-post"/>
              <p>info@gkjproductions.com</p>
            </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <label className="input-name" htmlFor="name">Name</label>
            <input className="input" name="name" type="text" id="name" required />

            <label className="input-name" htmlFor="email">Email</label>
            <input className="input" type="email" name="email" id="email" required />

            <label className="input-name" htmlFor="message">Message</label>
            <textarea
              className="message"
              id="message"
              name="message"
              required />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
          {status && <p>{status}</p>}
        </div>
        {/*
         <div className="contact-links"> 
        </div>
        
        */}
      </div>
    </main>
  );
}
