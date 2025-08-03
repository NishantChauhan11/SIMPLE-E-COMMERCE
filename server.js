const app = require("./src/app");
const connect = require("./src/db/db");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

connect();

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT NO :", PORT);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

