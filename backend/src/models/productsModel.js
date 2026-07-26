const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },

    subcategory: {
      type: String,
    },
  size: {
  type:[String],
  default: [],
},
    discount: Number,
     
    rating:{
    type:Number,
    default:4.5,
},

    stock: {
      type: Number,
      required: true,
    },
    variant: [
      {
        size: String,
        color: String,
      },
    ],
    features: [
      {
        key: String,
        value: String,
      },
    ],
     keywords: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", productSchema);