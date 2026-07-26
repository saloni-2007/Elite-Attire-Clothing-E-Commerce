const Product = require("../models/productsModel");
const Cart= require("../models/cartModel");
const Wishlist=require("../models/wishlistModel");



async function getAllProducts(req, res) {
  let page = 1;
  let limit = 8;
 const search = req.query.search || "";
const category = req.query.category || "";
const size = req.query.size || "";
const minPrice = Number(req.query.minPrice) || 0;
const maxPrice = Number(req.query.maxPrice) || 100000;
const sort = req.query.sort || "";
const filter = {};
if (search.trim()) {
  const words = search
    .toLowerCase()
    .replace(/'/g, "")
    .split(/\s+/);

  filter.keywords = {
    $all: words,
  };
}
// Category Filter
if (category) {
  filter.category = category;
}

// Size Filter
if (size) {
  filter.size = { $in: [size] };
}

// Price Filter
filter.price = {
  $gte: minPrice,
  $lte: maxPrice,
};




  if (req.query?.page) {
    page = parseInt(req.query.page);
  }
  if (req.query?.limit) {
    limit = parseInt(req.query?.limit);
  }
  
let sortOption = {};
if (sort === "low-to-high") {
  sortOption.price = 1;
}

if (sort === "high-to-low") {
  sortOption.price = -1;
}

if (sort === "newest") {
  sortOption.createdAt = -1;
}


const data = await Product.find(filter)
  .sort(sortOption)
  .skip((page - 1) * limit)
  .limit(limit);
  const total = await Product.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);
  const isNextPage = page < totalPages;
  const isPrevPage = page > 1;
  return res.send({
    success: true,
    message: `${total} Products Found`,
    data: data,
    pagination: { total, totalPages, page, limit, isNextPage, isPrevPage },
  });
}

async function getSingleProduct(req, res) {
  const productId = req.params.productId;
  const productData = await Product.findById(productId);
  if (!productData) {
    return res.status(404).send({
      success: false,
      message: "Product Not Found.",
    });
  }
  return res.send({
    success: true,
    message: "Product Found",
    data: productData,
  });
}

async function addProduct(req, res) {
  console.log("BODY", req.body);
  console.log("FILES:", req.files);

  const data = req.body;

  const {
    title,
    description,
    price,
    category,
    subcategory,
    size,
    discount,
    rating,
    stock,
    features,
    variant,
    keywords,
  } = data;

  const images = req?.files?.map((file) => file.filename);

  // Search Keywords
  const keywordsArray = [
    ...new Set(
      [title, subcategory, keywords]
        .join(",")
        .toLowerCase()
        .replace(/'/g, "")
        .split(/[\s,]+/)
        .map((item) => item.trim())
        .filter(Boolean)
    ),
  ];

  const productData = new Product({
    title,
    description,
    price,
    category,
    subcategory,
    size: Array.isArray(size) ? size : [size],
    discount,
    rating,
    stock,
    features,
    variant,
    images,
    keywords: keywordsArray,
  });

  const newProductData = await productData.save();

  return res.send({
    success: true,
    message: "Product Added Successfully",
    data: newProductData,
  });
}


async function updateProduct(req, res) {
  const {
    title,
    description,
    price,
    category,
    subcategory,
    size,
    discount,
    rating,
    stock,
    features,
    variant,
    keywords,
    productId,
  } = req.body;

  let oldImages = req.body.oldImages || [];

  // Ensure oldImages is always an array
  if (!Array.isArray(oldImages)) {
    oldImages = [oldImages];
  }

  const newImages = req.files?.map((file) => file.filename) || [];

  const images =
    newImages.length > 0
      ? [...oldImages, ...newImages]
      : oldImages;

  const updatedProductData = await Product.findByIdAndUpdate(
    productId,
    {
      title,
      description,
      price,
      category,
      subcategory,
      size: Array.isArray(size) ? size : [size],
      discount,
      rating,
      stock,
      features,
      variant,
      keywords,
      images,
    },
    { new: true }
  );

  return res.send({
    success: true,
    message: "Product Updated Successfully",
    data: updatedProductData,
  });
}

async function deleteProduct(req, res) {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).send({
      success: false,
      message: "Product ID is required",
    });
  }

  await Product.findByIdAndDelete(productId);

  await Cart.updateMany(
    {},
    {
      $pull: {
        items: {
          product: productId,
        },
      },
    }
  );

  await Wishlist.deleteMany({
    product: productId,
  });

  return res.send({
    success: true,
    message: "Product Deleted Successfully",
  });
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};