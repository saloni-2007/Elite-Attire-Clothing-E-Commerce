const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");


const isAuthenticated = require("../middlewares/authMiddleware");
router.post("/add", isAuthenticated, addToWishlist);
router.get("/", isAuthenticated, getWishlist);
router.delete("/:id", isAuthenticated, removeWishlist);

module.exports = router;