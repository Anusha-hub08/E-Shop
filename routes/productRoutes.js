const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

// Home Page
router.get("/", productController.homePage);

// Product Details Page 👇 ADD THIS
router.get("/product/:id", productController.productDetails);

// About Page
router.get("/about", (req, res) => {
    res.render("about");
});

// Contact Page
router.get("/contact", (req, res) => {
    res.render("contact");
});

module.exports = router;