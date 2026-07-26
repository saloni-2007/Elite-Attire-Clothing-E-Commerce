import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div>
          <h2>ELITE ATTIRE</h2>
          <p>
            Discover premium fashion that combines quality, comfort, and
            modern style for every occasion.
          </p>
        </div>

        {/* Customer Services */}
        <div>
          <h3>Customer Services</h3>
          <p>Easy Returns</p>
          <p>Fast Delivery</p>
          <p>Secure Payments</p>
          <p>24/7 Customer Support</p>
        </div>

        {/* Shopping Benefits */}
        <div>
          <h3>Why Shop With Us?</h3>
          <p>✔ Premium Quality Products</p>
          <p>✔ Affordable Prices</p>
          <p>✔ Latest Fashion Collection</p>
          <p>✔ Trusted by Thousands of Customers</p>
        </div>

        {/* Contact */}
        <div>
          <h3>Contact Us</h3>
          <p>📧 support@eliteattire.com</p>
          <p>📞 +91 9876543210</p>
          <p>📍 Lucknow, Uttar Pradesh, India</p>
        </div>

      </div>

      <hr />

      <p className="copy">
        © 2026 Elite Attire. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
