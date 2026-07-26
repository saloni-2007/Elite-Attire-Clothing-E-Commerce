const Subscriber = require("../models/Subscriber");

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const exist = await Subscriber.findOne({ email });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    await Subscriber.create({ email });

    res.status(201).json({
      success: true,
      message: "Subscribed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};