const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const {
  createPayment,
  verifyPayment,
} = require("../controllers/paymentController");

router.post(
  "/create",
  asyncHandler(authMiddleware),
  asyncHandler(createPayment)
);
router.post(
  "/verify",
  asyncHandler(authMiddleware),
  asyncHandler(verifyPayment)
);
module.exports = router;