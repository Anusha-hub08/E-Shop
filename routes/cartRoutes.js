const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cartController");

const auth = require("../middleware/authMiddleware");

router.get("/cart", auth, cartController.viewCart);

router.get("/cart/add/:id", auth, cartController.addToCart);

router.get("/cart/remove/:id", auth, cartController.removeItem);

module.exports = router;