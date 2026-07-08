const Product = require("../models/Product");

// Dashboard
exports.dashboard = async (req, res) => {

    const products = await Product.find({
    isDeleted: false
});

    res.render("adminDashboard", {
        products
    });

};

// Add Product Page
exports.addProductPage = (req, res) => {

    res.render("addProduct");

};

// Save Product
exports.addProduct = async (req, res) => {

    const { name, description, price, image, category } = req.body;

    await Product.create({

        name,
        description,
        price,
        image,
        category

    });

    res.redirect("/admin");

};

// Delete Product
exports.deleteProduct = async (req, res) => {

    await Product.findByIdAndUpdate(
        req.params.id,
        {
            isDeleted: true
        }
    );

    res.redirect("/admin");

};