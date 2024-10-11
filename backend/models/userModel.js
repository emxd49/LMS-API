const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is already taken"],
  },
  password: { type: String, required: [true, "password is required"] },
});

module.exports = mongoose.model("users", userSchema);
