const Product = require("../models/Product");

// Home Page
exports.homePage = async (req, res) => {

    try {

        const search = req.query.search || "";
        const category = req.query.category || "";

        let query = {
            name: {
                $regex: search,
                $options: "i"
            }
        };

        if (category) {
            query.category = category;
        }

        const products = await Product.find(query);

        res.render("home", {
            products,
            search,
            category
        });

    } catch (err) {

        console.log(err);

    }

};

// Product Details
exports.productDetails = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)
.populate("reviews.user");

        res.render("product", { product });

    } catch (err) {

        console.log(err);

    }

};