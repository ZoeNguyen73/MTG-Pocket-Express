require("dotenv").config();
const mongoose = require("mongoose");
const PACK_RULES = require("./packRules/packRules");
const PackRuleModel = require("../../models/packRuleModel");

const SET_CODE = "dsk";

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

  console.log("Pack rules data seeding...");

  const rules = PACK_RULES[SET_CODE];

  if (!rules || !Array.isArray(rules) || rules.length === 0) {
    console.log("No valid pack rules data found for set " + SET_CODE);
  } else {
    try {
      await PackRuleModel.insertMany(rules);
      console.log(`==> ✅ All ${rules.length} pack rules for set ${SET_CODE} have been seeded successfully.`);
    } catch (error) {
      console.error(`==> ❌ Error during bulk insert pack rules for set ${SET_CODE}: ${error.message}.`);
      process.exit(1);
    }
  }

  process.exit(0);
};

seed();

