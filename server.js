const checkoutRoutes = require("./routes/checkoutRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes=require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes=require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
console.log(process.env.MONGO_URI);

const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Global Variables
app.use((req, res, next) => {

    res.locals.search = "";

    next();

});
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "eshop_secret_key",
        resave: false,
        saveUninitialized: false,
    })
);

app.use("/",productRoutes);
app.use("/", cartRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/",orderRoutes);
app.use("/", adminRoutes);
app.use("/", wishlistRoutes);
app.use("/", reviewRoutes);



// Static Files


// View Engine
app.set("view engine", "ejs");
 app.use("/", authRoutes);

// Home Route


// Start Server
const PORT = process.env.PORT || 3000;
app.get("/hello", (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});