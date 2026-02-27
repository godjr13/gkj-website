import styles from "./page.css";
import Form from 'next/form'
import Image from "next/image"

export default function Contact() {
  return (
    <div>
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
        </div>

        <div className="contact-form">
          <Form>
            <h3 className="input-name" >Name</h3>
            <input className="input" name="name" type="text" id="name" />

            <h3 className="input-name">Email</h3>
            <input className="input" type="email" name="Email" id="email" />

            <h3 className="input-name">Message</h3>
            <textarea
              className="message"
              id="message"
              name="message" />
            <br></br>
            <button >Send</button>
          </Form>
        </div>

        <div className="contact-links">

        </div>
      </div>
    </div>
  );
}
