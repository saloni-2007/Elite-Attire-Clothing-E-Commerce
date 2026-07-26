const Order=require("../models/ordersModel");

async function getAllOrders(req,res) {
    const allOrders = await Order.find({}).populate([
        {path:"userId"},
        {path:"items.productId"},
    ]);

    return res.send({
        success: true,
        message:"success",
        data: allOrders,
    });
}

async function  getUserOrders(req,res) {
     const userData =req.user;
     const userId=userData._id;
     const userOrders = await Order.find({
    userId: userId,
     }).populate({
    path: "items.productId",
     });
     return res.send({
        success: true,
        message:"Success",
        data: userOrders,
    });
}
async function createOrder(req, res) {
  const userId = req.user._id;

  const {
    items,
    shippingAddress,
    paymentMode,
    totalOrderValue,
    paymentId,
    paymentOrderId,
    paymentSignature,
  } = req.body;

 const newOrder = new Order({
  userId,
  items,
  shippingAddress,
  paymentMode,

  paymentStatus:
    paymentMode === "COD"
      ? "pending"
      : "completed",

  orderStatus:
    paymentMode === "COD"
      ? "pending"
      : "confirmed",

  totalOrderValue,

  paymentId,
  paymentOrderId,
  paymentSignature,

  deliveredAt: null,
});
  const newOrderData = await newOrder.save();

  return res.send({
    success: true,
    message: "Order Placed Successfully",
    data: newOrderData,
  });
}
async function updateOrder(req,res) {
     const data=req.body;
     const{orderId,status}=data;
     let deliveredAt=null;
     if(status === "delivered"){
     deliveredAt=Date.now();
}
const updateOrderData=await Order.findByIdAndUpdate(orderId,{
  orderStatus:status,
  deliveredAt,
});
        return res.send({
        success: true,
        message: "Order Status Updated ",
        data: updateOrderData,
    });
}


module.exports={
    getAllOrders,
    getUserOrders,
    createOrder,
    updateOrder,
};