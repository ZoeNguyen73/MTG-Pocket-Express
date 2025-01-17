require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const packRouter = require("./routes/packRoutes");
const setRouter = require("./routes/setRoutes");
const userCardRouter = require("./routes/userCardRoutes");

const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 8800;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: process.env.CORS_ORIGIN }));

// all routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/packs", packRouter);
app.use("/api/v1/sets", setRouter);
app.use("/api/v1/user-cards", userCardRouter);

// Handle 404 errors
app.use(notFoundHandler);

// Centralized error handling middleware
app.use(errorHandler);

app.listen(port, async() => {
  try {
    await mongoose.connect(process.env.MONGO_DB_STRING, { dbName: "MTG-Pocket" });
  } catch (error) {
    console.log(`====>Failed to connect to DB<==== Error: ${error}`);
    process.exit(1);
  }
  console.log(`====>Connected to MongoDB`);
  console.log(`====>MTG Pocket app listening on port ${port}<====`);
})