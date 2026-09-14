import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import checkoutCSS from "./Checkout.module.css";

const IMAGE_API = "https://elite-attire-backend.onrender.com/uploads/";

const getImageUrl = (imageName) => {
  if (!imageName) return "";

  const fileName = imageName.split("/").pop();
  const parts = fileName.split("-");

  if (
    parts.length > 1 &&
    /^\d+$/.test(parts[0]) &&
    /^\d+$/.test(parts[1])
  ) {
    return IMAGE_API + parts.slice(1).join("-");
  }

  return IMAGE_API + fileName;
};

function Checkout() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    phone: "",
  });

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

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getFullAddress = () => {
    return `
Name: ${address.firstName} ${address.lastName}
Email: ${address.email}
Street: ${address.street}
City: ${address.city}
State: ${address.state}
ZIP Code: ${address.zipCode}
Country: ${address.country}
Phone: ${address.phone}
    `.trim();
  };

  const validateAddress = () => {
    if (
      !address.firstName.trim() ||
      !address.lastName.trim() ||
      !address.email.trim() ||
      !address.street.trim() ||
      !address.city.trim() ||
      !address.state.trim() ||
      !address.zipCode.trim() ||
      !address.country.trim() ||
      !address.phone.trim()
    ) {
      alert("Please fill all delivery information fields");
      return false;
    }

    return true;
  };

  async function placeOrder(
    paymentId = "",
    paymentOrderId = "",
    paymentSignature = ""
  ) {
    if (!validateAddress()) {
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
      shippingAddress: getFullAddress(),
      paymentMode: paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Completed",
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
    if (!validateAddress()) {
      return;
    }

    try {
      const response = await api.post("/payment/create", {
        amount: totalPrice,
      });

      console.log("Payment Response:", response.data);

      const { order, key } = response.data;

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
    } catch (error) {
      console.log(error);
      alert("Payment could not be started");
    }
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
      {/* LEFT SIDE */}
      <div className={checkoutCSS.left}>
        <h2>Delivery Information</h2>

        <div className={checkoutCSS.formGrid}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={address.firstName}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={address.lastName}
            onChange={handleAddressChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className={checkoutCSS.fullWidth}
            value={address.email}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="street"
            placeholder="Street Address"
            className={checkoutCSS.fullWidth}
            value={address.street}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="zipCode"
            placeholder="ZIP Code"
            value={address.zipCode}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleAddressChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className={checkoutCSS.fullWidth}
            value={address.phone}
            onChange={handleAddressChange}
          />
        </div>

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

      {/* RIGHT SIDE */}
      <div className={checkoutCSS.right}>
        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div className={checkoutCSS.card} key={item.product._id}>
            <img
              src={getImageUrl(item.product?.images?.[0])}
              alt={item.product?.title}
            />

            <div>
              <h3>{item.product.title}</h3>
              <p>₹ {item.product.price}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          </div>
        ))}

        <hr />

        <h2>Total: ₹ {totalPrice}</h2>

        <button onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;