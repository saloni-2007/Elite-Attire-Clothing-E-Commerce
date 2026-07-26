const Wishlist = require("../models/wishlistModel");

// Add to Wishlist
async function addToWishlist(req, res) {
  try {
    const { product } = req.body;

    const alreadyExists = await Wishlist.findOne({
      user: req.user._id,
      product,
    });

    if (alreadyExists) {
      return res.status(400).send({
        success: false,
        message: "Product already exists in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user._id,
      product,
    });

    return res.status(201).send({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}

// Get Wishlist
async function getWishlist(req, res) {
  try {
    let wishlist = await Wishlist.find({
      user: req.user._id,
    }).populate("product");

    const deletedItems = wishlist.filter((item) => !item.product);

    // Database se bhi delete kar do
    if (deletedItems.length > 0) {
      await Wishlist.deleteMany({
        _id: { $in: deletedItems.map((item) => item._id) },
      });
    }

    wishlist = wishlist.filter((item) => item.product);

    return res.status(200).send({
      success: true,
      count: wishlist.length,
      wishlist,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}

// Remove Wishlist
async function removeWishlist(req, res) {
  try {
    const wishlist = await Wishlist.findById(req.params.id);

    if (!wishlist) {
      return res.status(404).send({
        success: false,
        message: "Wishlist item not found",
      });
    }

    if (wishlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized",
      });
    }

    await Wishlist.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      success: true,
      message: "Wishlist item removed successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist,
};