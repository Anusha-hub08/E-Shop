const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");

const auth = require("../middleware/authMiddleware");

// Orders Page
router.get("/orders", auth, orderController.viewOrders);

module.exports = router;