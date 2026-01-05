require("dotenv").config();
const mongoose = require("mongoose");

const PACK_PRICES = require("./packPrices")
const PackPriceModel = require("../../models/packPriceModel");

const connectDb = async () => {
  try {

    if (!process.env.MONGO_DB_STRING) {
      throw new Error("MONGO_DB_STRING is not defined in the environment variables.");
    }

    await mongoose.connect(process.env.MONGO_DB_STRING, { dbName: process.env.DB_NAME });
    console.log("Connected to DB");
  } catch (error) {
    console.log(`Failed to connect to DB: ${error}`);
    process.exit(1);
  }
};

const seed = async () => {
  await connectDb();

  console.log("Pack prices data seeding...");

  try {
    await PackPriceModel.insertMany(PACK_PRICES);
    console.log(`==> ✅ All ${PACK_PRICES.length} pack prices have been seeded successfully.`);
  } catch (error) {
    console.error(`==> ❌ Error during bulk insert pack prices: ${error.message}.`);
    process.exit(1);
  }
  
  process.exit(0);

};

seed();