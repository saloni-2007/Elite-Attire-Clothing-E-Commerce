import{Link, Outlet} from "react-router-dom";
import style from"./AdminLayout.module.css";
import { useEffect, useState } from "react";
import api from "../utils/api";


function AdminLayout() {
  const [totalProducts, setTotalProducts] = useState(0);
const [todayOrders, setTodayOrders] = useState(0);


async function getDashboardData() {
  try {
    const productRes = await api.get("/products/all");
    const orderRes = await api.get("/orders/all");

    // Total Products
    setTotalProducts(productRes.data.pagination.total);

    // Today's Orders
    const today = new Date().toDateString();

    const ordersToday = orderRes.data.data.filter((order) => {
      return new Date(order.createdAt).toDateString() === today;
    });

    setTodayOrders(ordersToday.length);

  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  getDashboardData();
}, []);
  return (
    <section className={style.adminLayout}>
   <div className={style.adminSidebar}>

  <h1 className={style.logo}>Elite Attire</h1>

  <div className={style.adminLinks}>

    <Link to="/admin/products">
    
      <span>📦 Products</span>
    </Link>

    <Link to="/admin/orders">
    
      <span>🛒 Orders</span>
    </Link>

    <Link to="/admin/category">
      <span>📂 Categories</span>
    </Link>

  </div>

  {/* Bottom Card */}

 <div className={style.adminCard}>

  <h3>📊 Store Overview</h3>

 <div className={style.infoRow}>
  <span>📈 Total Products</span>
  <strong>{totalProducts}</strong>
</div>

<div className={style.infoRow}>
  <span>📦 Orders Today</span>
  <strong>{todayOrders}</strong>
</div>

<div className={style.infoRow}>
  <span>⭐ Store Status</span>
  <strong className={style.active}>Active</strong>
</div>  

</div>

</div>
    <Outlet/>
    </section>
    
  );
}

export default AdminLayout;