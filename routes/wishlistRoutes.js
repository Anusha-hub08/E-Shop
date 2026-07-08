const express = require("express");

const router = express.Router();

const wishlistController = require("../controllers/wishlistController");

router.get("/wishlist", wishlistController.viewWishlist);

router.get("/wishlist/add/:id", wishlistController.addToWishlist);

module.exports = router;
