const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectToDB = require("./config/connectToDB");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");
const paymentRoutes = require("./routes/paymentRoutes");
const contactRoutes = require("./routes/contactRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");


const app = express();


connectToDB();
const wishlistRoutes = require("./routes/wishlistRoutes");
const cartRoutes = require("./routes/cartRoutes");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.MODE =="development"?true:process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use("/uploads", express.static("uploads"));

app.get("/health", (req, res) => {
  res.send("server Is Running perfectly...");
});



app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes); //GET://http://localhost:4000/api/v1/category
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/subscribe", subscriberRoutes);


//post://http://localhost:4000/api/v1/auth/register
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server Started ! \nAccess At:http://localhost:${PORT}/health`);
});
