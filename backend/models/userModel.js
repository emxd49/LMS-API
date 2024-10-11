const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username is already taken"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    min: [8, "password should be atleast 8 characters long"],
  },
});

module.exports = mongoose.model("users", userSchema);
