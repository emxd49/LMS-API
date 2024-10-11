const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateTokenHandler = asyncHandler((req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    res.status(401);
    throw new Error("No authorization Header found!");
  }
  
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("User is not authorized");
    }
    console.log(decoded);
    next()
  });
});

module.exports = { validateTokenHandler };
