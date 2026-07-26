const express = require("express");

const {
    addToCart,
    getCart,
    removeFromCart,
    updateQuantity,
    clearCart,
} = require("../controllers/cartController");

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/add",
    asyncHandler(authMiddleware),
    asyncHandler(addToCart)
);

router.get(
    "/",
    asyncHandler(authMiddleware),
    asyncHandler(getCart)
);

router.delete(
    "/remove",
    asyncHandler(authMiddleware),
    asyncHandler(removeFromCart)
);

router.put(
    "/update",
    asyncHandler(authMiddleware),
    asyncHandler(updateQuantity)
);

router.delete(
    "/clear",
    asyncHandler(authMiddleware),
    asyncHandler(clearCart)
);

module.exports = router;