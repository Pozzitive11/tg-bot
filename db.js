const mongoose = require("mongoose");
require("dotenv").config(); // Для використання змінних середовища

const dbUrl = process.env.MONGODB_URI; // Використовуйте змінну середовища для URI

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
  } catch (e) {
    console.error("MongoDB connection error:", e.message);
    process.exit(1);
  }
};

module.exports = connectDB;
