import { useEffect, useState } from "react";
import api from "../utils/api";
import orderCSS from "./MyOrders.module.css";

const IMAGE_API = "http://localhost:4000/uploads/";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const response = await api.get("/orders/user-orders");

      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load orders");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={orderCSS.container}>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div className={orderCSS.orderCard} key={order._id}>
            <div className={orderCSS.header}>
              <h3>Order ID : {order._id}</h3>

              <span className={orderCSS.status}>
                {order.orderStatus}
              </span>
            </div>

            <p>
              <strong>Address :</strong> {order.shippingAddress}
            </p>

            <p>
              <strong>Payment :</strong> {order.paymentMode}
            </p>

            <p>
              <strong>Total :</strong> ₹ {order.totalOrderValue}
            </p>

           <div className={orderCSS.products}>
  {order.items.map((item) => {
    if (!item.productId) {
      return (
        <div key={item._id}>
          <p>Product not available</p>
        </div>
      );
    }

    return (
      <div className={orderCSS.product} key={item._id}>
        <img
          src={IMAGE_API + item.productId.images[0]}
          alt={item.productId.title}
        />

        <div>
          <h4>{item.productId.title}</h4>
          <p>₹ {item.productId.price}</p>
          <p>Quantity : {item.quantity}</p>
        </div>
      </div>
    );
  })}
</div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;