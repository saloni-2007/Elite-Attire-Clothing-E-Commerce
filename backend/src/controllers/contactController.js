const Contact = require("../models/contactModel");

async function sendMessage(req, res) {
  const { name, email, message } = req.body;

  const contact = await Contact.create({
    name,
    email,
    message,
  });

  return res.send({
    success: true,
    message: "Message Sent Successfully",
    data: contact,
  });
}

module.exports = {
  sendMessage,
};