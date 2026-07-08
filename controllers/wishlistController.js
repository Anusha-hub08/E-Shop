const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
exports.addToWishlist = async (req, res) => {

    if (!req.session.user)
        return res.redirect("/login");

    const productId = req.params.id;

    let wishlist = await Wishlist.findOne({
        user: req.session.user._id
    });

    if (!wishlist) {

        wishlist = new Wishlist({
            user: req.session.user._id,
            products: []
        });

    }

    const exists = wishlist.products.find(
        item => item.product.toString() === productId
    );

    if (!exists) {

        wishlist.products.push({
            product: productId
        });

    }

    await wishlist.save();

    res.redirect("/wishlist");

};
exports.viewWishlist = async (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    const wishlist = await Wishlist.findOne({
        user: req.session.user._id
    }).populate("products.product");

    const products = wishlist
        ? wishlist.products.map(item => item.product)
        : [];

    res.render("wishlist", {
        products
    });

};