require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 8800;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: process.env.CORS_ORIGIN }));

<<<<<<< HEAD
// Handle 404 errors
app.use(notFoundHandler);

// Centralized error handling middleware
app.use(errorHandler);
=======
app.use("/api/v1/auth", authRouter);
>>>>>>> e088e7e (feat: add authRouter to server.js)

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