const express = require("express");
const { registerUser, loginUser, refreshToken } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/token").post(refreshToken);

module.exports = { authRouter };
