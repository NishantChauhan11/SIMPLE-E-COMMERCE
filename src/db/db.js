const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("MongoDB connection successful"))
    .catch((err) => {
      console.error("Connection error:", err);
      process.exit(1);
    });
};

module.exports = connect;


