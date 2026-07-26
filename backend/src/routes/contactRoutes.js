const express = require("express");

const {
  sendMessage,
} = require("../controllers/contactController");

const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post(
  "/",
  asyncHandler(sendMessage)
);

module.exports = router;