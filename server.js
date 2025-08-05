require("dotenv").config();
const express = require("express");
const connectDB = require("./src/db/db");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send("App is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
