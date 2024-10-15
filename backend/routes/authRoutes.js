const express = require("express");
const { registerUser, loginUser,currentUser, refreshToken } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/current").post(currentUser);
authRouter.route("/refresh").post(refreshToken);

module.exports = { authRouter };
