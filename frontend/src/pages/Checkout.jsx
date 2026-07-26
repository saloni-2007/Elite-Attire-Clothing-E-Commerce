import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import checkoutCSS from "./Checkout.module.css";

const IMAGE_API = "http://localhost:4000/uploads/";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    try {
      const response = await api.get("/cart");

      if (response.data.success) {
        setCart(response.data.data.items);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const totalPrice = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  async function placeOrder(
    paymentId = "",
  paymentOrderId = "",
  paymentSignature = ""
  ) {
    if (!shippingAddress.trim()) {
      alert("Please Enter Shipping Address");
      return;
    }

    const items = cart
  .filter((item) => item.product)
  .map((item) => ({
    productId: item.product._id,
    quantity: item.quantity,
    variant: {},
  }));

    const orderData = {
      items,
      shippingAddress,
      paymentMode: paymentMethod,
      paymentStatus:
      paymentMethod === "COD" ? "Pending" : "Completed",
      totalOrderValue: totalPrice,

       paymentId,
  paymentOrderId,
  paymentSignature,
    };
  
  
    try {
      const response = await api.post("/orders/create", orderData);

      if (response.data.success) {
        await api.delete("/cart/clear");

        alert("Order Placed Successfully");

        navigate("/my-orders");
      }
    } catch (error) {
      console.log(error);
      alert("Order Failed");
    }
  }


 async function payNow() {

  if (!shippingAddress.trim()) {
    alert("Please Enter Shipping Address");
    return;
  }

  const response = await api.post("/payment/create", {
    amount: totalPrice,
  });
console.log("Payment Response:", response.data);
  const { order, key } = response.data;

console.log("Key:", key);
console.log("Order:", order);

  const options = {
    key,
    amount: order.amount,
    currency: order.currency,
    name: "Elite Attire",
    description: "Order Payment",
    order_id: order.id,

   handler: async function (response) {

  try {

    const verifyResponse = await api.post("/payment/verify", {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    });

    if (verifyResponse.data.success) {

      await placeOrder(
        response.razorpay_payment_id,
        response.razorpay_order_id,
        response.razorpay_signature
      );

    } else {

      alert("Payment Verification Failed");

    }

  } catch (error) {

    console.log(error);
    alert("Payment Verification Failed");

  }

},

    theme: {
      color: "#3399cc",
    },
  };

  const razor = new window.Razorpay(options);
razor.on("payment.failed", function (response) {

  console.log(response.error);

  alert(response.error.description);

});
  razor.open();
}
 async function handlePlaceOrder() {

  if (paymentMethod === "COD") {
    await placeOrder();
    return;
  }

  await payNow();

}


  return (
    <div className={checkoutCSS.container}>
      <div className={checkoutCSS.left}>

        <h2>Shipping Address</h2>

        <textarea
          rows="6"
          placeholder="Enter Your Full Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />

        <h2>Payment Method</h2>

<div className={checkoutCSS.payment}>
  <label>
    <input
      type="radio"
      name="payment"
      value="COD"
      checked={paymentMethod === "COD"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    Cash On Delivery
  </label>
</div>

<div className={checkoutCSS.payment}>
  <label>
    <input
      type="radio"
      name="payment"
      value="ONLINE"
      checked={paymentMethod === "ONLINE"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    Pay Online (Razorpay)
  </label>
</div>

       

      </div>

      <div className={checkoutCSS.right}>

        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div className={checkoutCSS.card} key={item.product._id}>

            <img
              src={IMAGE_API + item.product.images[0]}
              alt={item.product.title}
            />

            <div>
              <h3>{item.product.title}</h3>
              <p>₹ {item.product.price}</p>
              <p>Qty : {item.quantity}</p>
            </div>

          </div>
        ))}

        <hr />

        <h2>Total : ₹ {totalPrice}</h2>
<button onClick={handlePlaceOrder}>
    Place Order
</button>
      </div>
    </div>
  );
}

export default Checkout;