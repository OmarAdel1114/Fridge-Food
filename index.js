require("dotenv").config(); //these make the process read from a .env file (for security)

const express = require("express");

const app = express();

const cors = require("cors"); //This to make the frontend able to fetch the api

const mongoose = require("mongoose");

const path = require("node:path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const httpStatusText = require("./utils/httpStatusText");

const url = process.env.MONGO_URL;

console.log("process:", process.env.MONGO_URL);

mongoose.connect(url).then(() => {
  console.log("Mongodb Server Started");
});

const port = process.env.PORT;

app.use(express.json()); // this to make express handle the json in the body

const recipeRouter = require("./Routes/recipe.routes");
const userRouter = require("./Routes/user.routes");
app.use("/api/recipes", recipeRouter);
app.use("/api/users", userRouter);

app.use(cors());

// Global middleware for not found routes
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "This resource is not available",
  });
});

// Global middleware for error handling
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
