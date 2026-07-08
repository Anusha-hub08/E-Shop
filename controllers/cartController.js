const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {

    try {

        const userId = req.session.user._id;

        const productId = req.params.id;

        const item = await Cart.findOne({
            user: userId,
            product: productId
        });

        if (item) {

            item.quantity++;

            await item.save();

        } else {

            await Cart.create({
                user: userId,
                product: productId,
                quantity: 1
            });

        }

        res.redirect("/cart");

    } catch (err) {

        console.log(err);

    }

};

exports.viewCart = async (req, res) => {

    try {

        const cartItems = await Cart.find({
            user: req.session.user._id
        }).populate("product");

        res.render("cart", {
            cartItems
        });

    } catch (err) {

        console.log(err);

    }

};

exports.removeItem = async (req, res) => {

    await Cart.findByIdAndDelete(req.params.id);

    res.redirect("/cart");

};