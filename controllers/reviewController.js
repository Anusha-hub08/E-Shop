const Product = require("../models/Product");

// Add Review
exports.addReview = async (req, res) => {

    if (!req.session.user)
        return res.redirect("/login");

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    product.reviews.push({
        user: req.session.user._id,
        rating,
        comment
    });

    await product.save();

    res.redirect("/product/" + req.params.id);

};