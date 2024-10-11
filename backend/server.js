const { connectDB } = require("./database/mongoDB");
const { errorHandler } = require("./middleware/errorHandler");
const { authRouter } = require("./routes/authRoutes");
// const { validateTokenHandler } = require("./middleware/validateTokenHandler");
const cors = require("cors");
const express = require("express");

connectDB();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use(errorHandler);
app.listen(port, () => {
  console.log("Server runnning on PORT:", port);
});
