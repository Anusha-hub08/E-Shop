const express = require("express");

const router = express.Router();

const checkoutController = require("../controllers/checkoutController");

router.get("/", checkoutController.checkoutPage);

router.post("/place-order", checkoutController.placeOrder);

module.exports = router;