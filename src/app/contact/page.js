"use client";
import styles from "./page.css";
import { useState } from "react";
import Form from 'next/form'
import Image from "next/image"

export default function Contact() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(e.target);

    const res = await fetch("/api/contact",{
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(
        {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        }
      ),
    });

    const data = await res.json();
    setStatus(data.success ? "Message sent!" : "Something went wrong.");
    setLoading(false);
  }


  return (
    <div className="backgound">
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
          <Form onSubmit={handleSubmit}>
            <h3 className="input-name" >Name</h3>
            <input className="input" name="name" type="text" id="name" />

            <h3 className="input-name">Email</h3>
            <input className="input" type="email" name="email" id="email" />

            <h3 className="input-name">Message</h3>
            <textarea
              className="message"
              id="message"
              name="message" />
            <br></br>
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </Form>
          {status && <p>{status}</p>}
        </div>
        {/*
         <div className="contact-links"> 
        </div>
        
        */}
      </div>
    </div>
  );
}
