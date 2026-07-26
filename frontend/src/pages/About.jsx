import "./About.css";
import { useNavigate } from "react-router-dom";
function About() {

const navigate = useNavigate();

  return (
    <div className="about-page">

      <section className="hero">
        <div className="hero-content">
          <h1>About Elite Attire</h1>
          <p>Wear Confidence. Wear Elite.</p>
        </div>
      </section>

      <section className="about-container">

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800"
            alt="Elite Attire"
          />
        </div>

        <div className="about-text">
          <h2>Who We Are</h2>

          <p>
            <span>Elite Attire</span> is a modern fashion destination that
            brings premium quality clothing and accessories for men and women.
            Our goal is to help every customer express their personality through
            stylish and comfortable fashion.
          </p>

          <p>
            We carefully select every product to ensure excellent quality,
            affordable prices, and the latest fashion trends. Whether you're
            shopping for casual wear, party wear, or everyday essentials,
            Elite Attire has something for everyone.
          </p>

         <button
  className="explore-btn"
  onClick={() => navigate("/products")}
>
  Explore Collection
</button>
        </div>

      </section>

      
      <section className="features">

        <div className="card">
          <i className="fa-solid fa-truck-fast"></i>
          <h3>Fast Delivery</h3>
          <p>Quick delivery across India.</p>
        </div>

        <div className="card">
          <i className="fa-solid fa-shirt"></i>
          <h3>Premium Quality</h3>
          <p>High quality fashion products.</p>
        </div>

        <div className="card">
          <i className="fa-solid fa-credit-card"></i>
          <h3>Secure Payment</h3>
          <p>100% safe online payment.</p>
        </div>

        <div className="card">
          <i className="fa-solid fa-headset"></i>
          <h3>24/7 Support</h3>
          <p>Always ready to help our customers.</p>
        </div>

      </section>

    
      <section className="stats">

        <div>
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>

        <div>
          <h2>500+</h2>
          <p>Products</p>
        </div>

        <div>
          <h2>50+</h2>
          <p>Fashion Brands</p>
        </div>

        <div>
          <h2>99%</h2>
          <p>Satisfaction</p>
        </div>

      </section>

    
      <footer>
        <h2>Elite Attire</h2>
        <p>Style that inspires confidence.</p>
      </footer>

    </div>
  );
}

export default About;