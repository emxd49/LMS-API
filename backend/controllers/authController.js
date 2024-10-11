const authService = require("../services/authService");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const newUser = await authService.addUser(username, password);
  res.status(201).json({ message: "Successfully registered user" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const { accessToken, refreshToken } = await authService.loginUser(
    username,
    password
  );

  res.status(200).json({
    username: username,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    res.status(401);
    throw new Error("Access Denied. No refresh token provided");
  }
  const accessToken = authService.generateToken(refreshToken);
  res.status(200).json({ accessToken: accessToken });
});

const logoutUser = asyncHandler(async (req, res) => {
  //!to be implemented
});

module.exports = { registerUser, loginUser, refreshToken };
