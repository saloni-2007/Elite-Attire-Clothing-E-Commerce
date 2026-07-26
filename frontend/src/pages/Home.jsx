import hero1 from "../assets/imagecart.png";
import hero2 from "../assets/img7.webp";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useState } from "react";
import api from "../utils/api";


const slides = [
  {
    id: 1,
    image: hero1,
    title: "Premium Fashion Store",
    subtitle:
      "Transform yourself with premium quality clothes crafted for comfort and style.",
  },
  {
    id: 2,
    image: hero2,
    title: "",
    subtitle:
      "Discover elegant designs clothes that bring beauty and functionality to yourself.",
  },
];


function Home() {
  const navigate = useNavigate();
const [email, setEmail] = useState("");


  const handleExplore = () => {
    navigate("/products");
  };

const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const res = await api.post("/subscribe", { email });

      alert(res.data.message);
      setEmail("");
    } catch (error) {
      alert(error.response?.data?.message || "Subscription Failed");
    }
  };


  return (
    <>
    <section className="home-section">
      <div className="hero-slider">
        {slides.map((slide) => (
          <div className="hero-slide" key={slide.id}>
            <img src={slide.image} alt={slide.title} />

            <div className="hero-overlay"></div>

            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>

              <button onClick={handleExplore}>
                Explore Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>


  
<section className="why-us">
  <h2>Why Choose Elite Attire?</h2>

  <div className="why-container">
    <div className="why-card">
      <span>🚚</span>
      <h3>Free Delivery</h3>
      <p>Free shipping on all orders above ₹999.</p>
    </div>

    <div className="why-card">
      <span>⭐</span>
      <h3>Premium Quality</h3>
      <p>Best quality fabrics with modern designs.</p>
    </div>

    <div className="why-card">
      <span>🔒</span>
      <h3>Secure Payment</h3>
      <p>100% secure payment with Razorpay.</p>
    </div>

    <div className="why-card">
      <span>↩️</span>
      <h3>Easy Returns</h3>
      <p>7 Days hassle free return policy.</p>
    </div>
  </div>
</section>

{/* Newsletter */}

<section className="newsletter">
    <h2>Join Elite Attire</h2>
    <p>Get offers and latest fashion updates.</p>

    <div className="newsletter-box">
       <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
<button className="sub" onClick={handleSubscribe}>
  Subscribe
</button>


       </div>
</section>

<Footer />
</>
  );
}

export default Home;