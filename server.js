require("dotenv").config();
const express = require("express");
const connectDB = require("./src/db/db");
const productModel = require("./src/models/product.model");
const productRouter = require("./src/router/product.router");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// ✅ Mount the product router
app.use("/products", productRouter);

// Home route
app.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const products = category
      ? await productModel.find({ category })
      : await productModel.find();

    res.render("home", { products, decode: null });
  } catch (err) {
    console.error("Error loading home:", err);
    res.status(500).send("Something went wrong!");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
