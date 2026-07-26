import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import api from "../utils/api";
import cartCSS from "./Cart.module.css";
 import { useNavigate } from "react-router-dom";


const IMAGE_API = "http://localhost:4000/uploads/";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getCartCount } = useCart();

  const navigate = useNavigate();
  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
  try {
    const response = await api.get("/cart");
    const res = response.data;

    if (res.success) {
      setCart(res.data?.items || []);
      await getCartCount();
    }
  } catch (error) {
    console.log(error);
    alert("Unable To Load Cart");
  } finally {
    setLoading(false);
  }
}

 async function increaseQuantity(productId, quantity) {
  try {
    await api.put("/cart/update", {
      productId,
      quantity: quantity + 1,
    });

    await getCart();
  } catch (error) {
    console.log(error);
  }
}

async function decreaseQuantity(productId, quantity) {
  if (quantity === 1) return;

  try {
    await api.put("/cart/update", {
      productId,
      quantity: quantity - 1,
    });

    await getCart();
  } catch (error) {
    console.log(error);
  }
}

 async function removeProduct(productId) {
  try {
    await api.delete("/cart/remove", {
      data: {
        productId,
      },
    });

    await getCart();
  } catch (error) {
    console.log(error);
  }
}

 async function checkout() {
  if (cart.length === 0) {
    alert("Cart Is Empty");
    return;
  }

  const items = cart.map((item) => ({
    productId: item.product._id,
    quantity: item.quantity,
    variant: {},
  }));

  const data = {
    items,
    shippingAddress: "Lucknow",
    paymentMode: "COD",
    paymentStatus: "Pending",
    totalOrderValue: totalPrice,
  };

  try {
    const response = await api.post("/orders/create", data);

    const res = response.data;

    if (res.success) {
      await api.delete("/cart/clear");

      await getCart();

      alert("Order Placed Successfully");
    }
  } catch (error) {
    console.log(error);
    alert("Checkout Failed");
  }
}
const totalPrice = cart.reduce((total, item) => {
  if (!item.product) return total;

  return total + item.product.price * item.quantity;
}, 0);

   if (loading) {
    return <h2>Loading...</h2>;
  }

 return (
  <div className={cartCSS.container}>
    <h1>Shopping Cart</h1>

    {cart.length === 0 ? (
      <h2 className={cartCSS.emptyCart}>Your Cart Is Empty</h2>
    ) : (
      <div className={cartCSS.cartLayout}>

        {/* Left Side - Cart Items */}
        <div className={cartCSS.cartItems}>

          {cart
           .filter((item) => item.product)
              .map((item) => (
            <div className={cartCSS.card} key={item.product._id}>

              <img
                src={IMAGE_API + item.product.images[0]}
                alt={item.product.title}
              />

              <div className={cartCSS.info}>

                <h2>{item.product.title}</h2>

                <h3>₹ {item.product.price}</h3>

                <div className={cartCSS.quantity}>

                  <button
                    onClick={() =>
                      decreaseQuantity(item.product._id, item.quantity)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.product._id, item.quantity)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className={cartCSS.removeBtn}
                  onClick={() => removeProduct(item.product._id)}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* Right Side Summary */}

        <div className={cartCSS.summary}>

          <h2>Price Details</h2>

          <div className={cartCSS.row}>
            <span>Subtotal</span>
            <span>₹ {totalPrice}</span>
          </div>

          <div className={cartCSS.row}>
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr />

          <div className={cartCSS.row}>
            <strong>Total</strong>
            <strong>₹ {totalPrice}</strong>
          </div>

          <button
            className={cartCSS.checkoutBtn}
            onClick={() => navigate("/checkout")}
          >
            Proceed To Checkout
          </button>

        </div>

      </div>
    )}
  </div>
);
}

export default Cart;