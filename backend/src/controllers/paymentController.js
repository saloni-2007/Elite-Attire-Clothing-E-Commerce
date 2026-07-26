const razorpay = require("../utils/razorpay");
const crypto = require("crypto");


async function createPayment(req, res) {
  try {
    const { amount } = req.body;
      
    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    console.log("Razorpay Order:", order);

    return res.send({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
    });

  } catch (error) {
    console.log("Razorpay Error:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}
async function verifyPayment(req, res) {

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    return res.send({
      success: true,
      message: "Payment Verified Successfully",
    });
  }

  return res.status(400).send({
    success: false,
    message: "Payment Verification Failed",
  });
}
module.exports = {
  createPayment,
  verifyPayment,
};