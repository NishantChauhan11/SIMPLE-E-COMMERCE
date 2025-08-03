const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

// Middleware to decode user token
function getDecodedUser(req) {
    const token = req.cookies.token;
    let decode = null;
    if (token) {
        try {
            decode = jwt.verify(token, "secret_key");
        } catch (err) {
            decode = null;
        }
    }
    return decode;
}

// Register page
router.get("/register", (req, res) => {
    const decode = getDecodedUser(req);
    res.render("register.ejs", { decode });
});

// Register user
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    await userModel.create({
        username,
        email,
        password: hashedPass
    });

    res.redirect("/users/login");
});

// Login page
router.get("/login", (req, res) => {
    const decode = getDecodedUser(req);
    res.render("login.ejs", { decode });
});

// Login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.redirect("/users/register");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.redirect("/users/login");

    const token = jwt.sign({ id: user._id, username: user.username }, "secret_key");
    res.cookie("token", token);
    res.redirect("/");
});

// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/users/login");
});

module.exports = router;
