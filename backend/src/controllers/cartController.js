const Cart = require("../models/cartModel");
const Product = require("../models/productsModel");

// Add Product To Cart
async function addToCart(req, res) {
    const userId = req.user._id;
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).send({
            success: false,
            message: "Product Not Found",
        });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({
            user: userId,
            items: [
                {
                    product: productId,
                    quantity: 1,
                },
            ],
        });

        await cart.save();

        return res.send({
            success: true,
            message: "Product Added To Cart",
            data: cart,
        });
    }

    const productIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
        cart.items[productIndex].quantity += 1;
    } else {
        cart.items.push({
            product: productId,
            quantity: 1,
        });
    }

    await cart.save();

    return res.send({
        success: true,
        message: "Product Added To Cart",
        data: cart,
    });
}

// Get User Cart
async function getCart(req, res) {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate(
        "items.product"
    );
   if (!cart) {
        return res.send({
            success: true,
            message: "Cart Is Empty",
            data: [],
        });
    }
cart.items = cart.items.filter((item) => item.product);
await cart.save();
 
    return res.send({
        success: true,
        message: "Cart Found",
        data: cart,
    });
}

// Remove Product From Cart
async function removeFromCart(req, res) {
    const userId = req.user._id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.status(404).send({
            success: false,
            message: "Cart Not Found",
        });
    }

    cart.items = cart.items.filter(
  (item) => item.product && item.product.toString() !== productId
);

    await cart.save();

    return res.send({
        success: true,
        message: "Product Removed From Cart",
        data: cart,
    });
}

// Update Quantity
async function updateQuantity(req, res) {
    const userId = req.user._id;

    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.status(404).send({
            success: false,
            message: "Cart Not Found",
        });
    }

    const product = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (!product) {
        return res.status(404).send({
            success: false,
            message: "Product Not Found In Cart",
        });
    }

    product.quantity = quantity;

    await cart.save();

    return res.send({
        success: true,
        message: "Quantity Updated",
        data: cart,
    });
}

// Clear Cart
async function clearCart(req, res) {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.status(404).send({
            success: false,
            message: "Cart Not Found",
        });
    }

    cart.items = [];

    await cart.save();

    return res.send({
        success: true,
        message: "Cart Cleared Successfully",
        data: cart,
    });
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateQuantity,
    clearCart,
};