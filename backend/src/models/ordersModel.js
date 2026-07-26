const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {


    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number,
        variant: Object,
      },
    ],

     shippingAddress: String,

   paymentStatus: {
  type: String,
  enum: ["pending", "completed"],
  default: "pending",
},
paymentMode: {
  type: String,
  enum: ["COD", "ONLINE"],
},

    totalOrderValue: Number,

    deliveredAt: Date,

    paymentId: {
    type: String,
    default: "",
},

paymentOrderId: {
    type: String,
    default: "",
},

paymentSignature: {
    type: String,
    default: "",
},
orderStatus: {
  type: String,
  enum: [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
    "returned",
  ],
  default: "pending",
},


   
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;