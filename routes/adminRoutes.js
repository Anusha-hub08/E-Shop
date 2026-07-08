const express = require("express");

const router = express.Router();

const admin = require("../controllers/adminController");

router.get("/admin", admin.dashboard);

router.get("/admin/add", admin.addProductPage);

router.post("/admin/add", admin.addProduct);

router.get("/admin/delete/:id", admin.deleteProduct);

module.exports = router;