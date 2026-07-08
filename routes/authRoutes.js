
const express = require("express");
console.log("Auth Routes Loaded");
const router = express.Router();

const authController = require("../controllers/authController");

// Register
router.get("/register", (req, res) => {

    res.render("register");

});

router.post("/register", (req, res) => {
    console.log("POST /register reached");
    console.log(req.body);

    authController.registerUser(req, res);
});

// Login
router.get("/login", (req, res) => {

    res.render("login");

});

router.post("/login", authController.loginUser);

// Logout
router.get("/logout", authController.logoutUser);

module.exports = router;