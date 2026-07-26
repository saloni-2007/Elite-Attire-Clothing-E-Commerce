import { useEffect,useState } from "react";
import "./AdminOrders.css";
import api from "../../utils/api";

function AdminOrders() {

  const [ordersData,setOrderData]=useState([]);
 const [selectedOrder, setSelectedOrder] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
 
  async function getData() {
    const response=await api.get("/orders/all");
    const res =response.data;
    if(res?.success){
      console.log(res);
      setOrderData(res.data);
    }
    console.log(res.data);
  }

async function updateStatus(orderId, status) {
  try {
    const response = await api.put("/orders/update-status", {
  orderId,
  status,
});

    if (response.data.success) {
      alert(response.data.message);
      getData();
    }
  } catch (error) {
    console.log(error);
  }
}





  useEffect(()=>{
    getData();
  },[]);

  return (
    <section className="adminOrders">
      <div className="ordersHeader">
        <h1>Orders</h1>
      </div>

      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

        <tbody>
  {ordersData.map((order) => (
    <tr key={order._id}>

      <td>{order._id}</td>

      <td>
        {new Date(order.createdAt).toLocaleDateString()}
      </td>

      <td>{order.userId?.name}</td>

      <td>₹ {order.totalOrderValue}</td>

      <td>{order.paymentStatus}</td>

      <td>{order.paymentMode || "N/A"}</td>

      <td>
        <span className={`status ${order.orderStatus}`}>
          {order.orderStatus}
        </span>
      </td>

      {/* Action Column */}
      <td>
        <div className="actionBtns">

          <select
            value={order.orderStatus}
            onChange={(e) =>
              updateStatus(order._id, e.target.value)
            }
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>

        <button
  className="viewBtn"
  onClick={() => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }}
>
  View
</button>

        </div>
      </td>

    </tr>
  ))}
</tbody>
        </table>
      </div>

      {isModalOpen && selectedOrder && (
  <div className="orderOverlay">
    <div className="orderModal">

      <div className="orderHeader">
        <h2>Order Details</h2>

        <button
  className="closeBtn"
  onClick={() => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  }}
>
  ✖
</button>
      </div>

      <div className="orderBody">

        <p>
          <strong>Customer :</strong>{" "}
          {selectedOrder.userId?.name}
        </p>

        <p>
          <strong>Email :</strong>{" "}
          {selectedOrder.userId?.email}
        </p>

        <p>
          <strong>Address :</strong>{" "}
          {selectedOrder.shippingAddress}
        </p>

        <p>
          <strong>Payment :</strong>{" "}
          {selectedOrder.paymentStatus}
        </p>

        <p>
          <strong>Payment Mode :</strong>{" "}
          {selectedOrder.paymentMode}
        </p>

        <p>
          <strong>Status :</strong>{" "}
          {selectedOrder.orderStatus}
        </p>

        <h3>Products</h3>

      {selectedOrder.items.map((item) => (
  item.productId && (
    <div key={item._id} className="productRow">
      <img
        src={`http://localhost:4000/uploads/${item.productId.images?.[0]}`}
        alt={item.productId.title}
      />

      <div>
        <h4>{item.productId.title}</h4>
        <p>₹ {item.productId.price}</p>
        <p>Qty : {item.quantity}</p>
      </div>
    </div>
  )
))}

      </div>
    </div>
  </div>
)}
    </section>
  );
}

export default AdminOrders;