const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/appError");
const JWTEXPIRY = process.env.JWT_EXPIRY_TIME || "30m";
const JWTREFRESHEXPIRY = process.env.JWT_REFRESH_TOKEN_EXPIRY_TIME || "24h";

const getUser = async (username) => {
  const user = await userModel.findOne({ username: username });
  return user;
};

const addUser = async (username, password) => {
  const existingUser = await userModel.findOne({ username: username });
  if (existingUser) {
    throw new AppError(400, "username already exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username: username,
    password: hashedPassword,
  });
  return user;
};

const loginUser = async (username, password) => {
  const user = await userModel.findOne({ username: username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError(400, "invalid username or password!");
  }
  const accessToken = jwt.sign(
    {
      username: username,
    },
    process.env.JWTKEY,
    { expiresIn: JWTEXPIRY }
  );
  const refreshToken = jwt.sign(
    {
      username: username,
    },
    process.env.JWTKEY,
    { expiresIn: JWTREFRESHEXPIRY }
  );
  return accessToken, refreshToken;
};

const generateToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, secretKey);
    const accessToken = jwt.sign({ username: decoded.username }, secretKey, {
      expiresIn: JWTEXPIRY,
    });
    return accessToken;
  } catch (error) {
    throw new AppError(401, "Invalid refresh token");
  }
};

module.exports = { getUser, addUser, loginUser, generateToken };
