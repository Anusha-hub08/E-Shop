const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register User
exports.registerUser = async (req, res) => {
    try {
        console.log("Register Request:", req.body);

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        console.log("User Registered Successfully");

        res.redirect("/login");

    } catch (error) {
        console.error("Registration Error:");
        console.error(error);

        res.status(500).send(error.message);
    }
};

// Login User
exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("User Not Found");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.send("Wrong Password");
        }

        req.session.user = user;

        res.redirect("/");

    } catch (error) {
        console.log(error);
        res.send("Login Failed");
    }
};

// Logout
exports.logoutUser = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

};