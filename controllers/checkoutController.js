const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.checkoutPage = async (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    const cartItems = await Cart.find({
        user: req.session.user._id
    }).populate("product");

    let subtotal = 0;

    cartItems.forEach(item => {
        subtotal += item.product.price * item.quantity;
    });

    const tax = Math.round(subtotal * 0.10);
    const shipping = subtotal > 0 ? 99 : 0;
    const total = subtotal + tax + shipping;

    res.render("checkout", {
        cartItems,
        subtotal,
        tax,
        shipping,
        total
    });

};

exports.placeOrder = async (req, res) => {

    const cartItems = await Cart.find({
        user: req.session.user._id
    }).populate("product");

    let total = 0;

    const products = [];

    cartItems.forEach(item => {

        total += item.product.price * item.quantity;

        products.push({
            product: item.product._id,
            quantity: item.quantity
        });

    });

    await Order.create({

        user: req.session.user._id,

        products,

        total,

        status: "Placed",

        address: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            country: req.body.country
        },

        paymentMethod: req.body.payment

    });

    await Cart.deleteMany({
        user: req.session.user._id
    });

    res.redirect("/orders");

};