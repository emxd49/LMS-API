const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Database Connected!");
  } catch (error) {
    console.log("Error connecting to database", err);
    process.exit(1);
  }
};

module.exports = { connectDB };
