import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import "./Header.css";
function Header() {
  const { cartCount } = useCart();
  const [search, setSearch] = useState("");
const navigate = useNavigate();
  return (
    <header>
      {/* Code for left side of header */}
      <div className="header-left">
        <h1 className="header-logo">Elite Attire</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to='About'>About US</Link>
            </li>
            <li>
              <Link to='Contact'>Contact US</Link>
              </li>
              <li>
  <Link to="/cart" className="cart-link">

    <FaShoppingCart />

    <span>Cart</span>

    <span className="cart-count">
      {cartCount}
    </span>

  </Link>
</li>
<li>
<Link to="/wishlist">Wishlist</Link>
    </li>
            <li>
              <Link to='login'>Login</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Code for right side of header */}
      <div className="header-right">
        <div className="search">
          <FaSearch className="search-icon" />
          <input
  type="text"
  placeholder="Search elite collections..."
  value={search}
  onChange={(e) => {
    const value = e.target.value;
    setSearch(value);
    navigate(`/products?search=${value}`);
  }}
/>
           </div>
       
       
      </div>
    </header>
  );
}

export default Header;