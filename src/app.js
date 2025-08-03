const express = require("express");
const indexRouter = require("./router/index.router");
const productRouter = require("./router/product.router");
const userRouter = require("./router/user.router");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require("path");

const app = express();

app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

module.exports = app;
