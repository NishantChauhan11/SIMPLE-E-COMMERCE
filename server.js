require("dotenv").config();
const express = require("express");
const connectDB = require("./src/db/db");
const productModel = require("./src/models/product.model");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Serve static files (like home.css)
app.use(express.static("public"));

// Setup view engine for EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Home route: render home.ejs with all products
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
