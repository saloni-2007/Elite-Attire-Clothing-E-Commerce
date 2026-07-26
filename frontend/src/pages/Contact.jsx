import { useState } from "react";
import api from "../utils/api";

import "./Contact.css";
function Contact() {
  const [data, setData] = useState({
  name: "",
  email: "",
  message: "",
});
function handleChange(e) {
  const { name, value } = e.target;

  setData({
    ...data,
    [name]: value,
  });
}

async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await api.post("/contact", data);

    if (response.data.success) {
      alert(response.data.message);

      setData({
        name: "",
        email: "",
        message: "",
      });
    }
  } catch (error) {
    console.log(error);
    alert("Message not sent");
  }
}
  return (
    <>
      {/* Hero Banner */}
      <section className="contact-hero">
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600"
          alt="Contact"
        />
        <div className="overlay">
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you. Let's create something amazing together.
          </p>
        </div>
      </section>
      {/* Contact Section */}
      <section className="contact">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            Have questions about our products or your order? Our team is here to help you.
          </p>
          <div className="info-box">
            <h3>📍 Address</h3>
            <p>Hazratganj, Lucknow, Uttar Pradesh</p>
          </div>
          <div className="info-box">
            <h3>📞 Phone</h3>
            <p>+91 98765 43210</p>
          </div>
          <div className="info-box">
            <h3>✉ Email</h3>
            <p>eliteattire@gmail.com</p>
          </div>
        </div>
       <form onSubmit={handleSubmit}>
              <input
  type="text"
  name="name"
  placeholder="Your Name"
  value={data.name}
  onChange={handleChange}
/>
<input
  type="email"
  name="email"
  placeholder="Email Address"
  value={data.email}
  onChange={handleChange}
/>
<textarea
  rows="6"
  name="message"
  placeholder="Write your message..."
  value={data.message}
  onChange={handleChange}
/>
<button type="submit">
  Send Message
</button>

       </form>
      </section>
    </>
  );
}
export default Contact;