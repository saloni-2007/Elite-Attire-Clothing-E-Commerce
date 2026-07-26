import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Products from "./pages/Products";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminLayout from "./layout/AdminLayout";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCategory from "./pages/admin/AdminCategory";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";


function App() {

  const loc = window.location.pathname;
  const isAdminRoute = loc.includes("admin");

  return (
    <BrowserRouter>

      <CartProvider>

        {!isAdminRoute && <Header />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="category" element={<AdminCategory />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>

      </CartProvider>

    </BrowserRouter>
  );
}

export default App;